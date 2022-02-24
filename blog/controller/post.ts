/*
 * @Description: 用于处理文章相关的请求
 * @Author: MADAO
 * @Date: 2022-02-23 14:48:31
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-24 16:56:51
 */
import type { CreatePostParams, PostData } from '~/types/controller/post';
import type { User, Post } from '@prisma/client';
import type { ResponseData } from '~/types/api';

import { prisma } from '~/utils/db';
import { formatResponse } from '~/utils/middlewares';
import { promiseWithSettled } from '~/utils/promise';
import UserController from './user';

const userController = new UserController();

export default class PostController {
  static validator(postData: CreatePostParams) {
    const postDataErrors = {
      title: '文章标题不能为空',
      content: '文章内容不能为空',
      introduction: '文章简介不能为空',
    };

    let errorMessage = '';
    Object.keys(postData).every(key => {
      if (!postData[key as keyof PostData]) {
        errorMessage = postDataErrors[key as keyof PostData];
        return false;
      }

      return true;
    });

    return errorMessage || true;
  }

  async upsertPost(userId: number, postData: CreatePostParams): Promise<ResponseData<Post | {}>> {
    // 判断用户信息
    const handleUser = () => userController.getUser({ id: userId }).then(user => {
      if (user.status === 'rejected') {
        return Promise.reject(formatResponse(500, user.reason, user.reason.message || '获取用户失败'));
      }

      if (!user.value) {
        return Promise.reject(formatResponse(404, {}, '用户不存在'));
      }

      return user.value;
    });

    // 验证参数
    const handleParams = () => new Promise((resolve, reject) => {
      const postVerifiedResult = PostController.validator(postData);

      if (postVerifiedResult !== true) {
        reject(formatResponse(422, {}, postVerifiedResult));
        return;
      }

      resolve(true);
    });

    // 创建或者更新文章
    const handlePost = (user: User) => {
      const { id = -1, ...rest } = postData;
      return prisma.post.upsert({
        where: { id },
        create: {
          ...rest,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
        update: {
          ...rest,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      })
        .then(post => post)
        .catch(error => Promise.reject(formatResponse(500, error, error.message)));
    };

    try {
      const user = await handleUser();
      await handleParams();
      await handlePost(user);
      const post = await handlePost(user);
      return formatResponse(200, post, postData.id ? '更新成功' : '发布成功');
    } catch (error: any) {
      return error;
    }
  }

  async getDetail(id: number) {
    const postDetail = await promiseWithSettled(prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    }));

    if (postDetail.status === 'fulfilled') {
      return formatResponse(200, postDetail.value);
    }

    return formatResponse(500, postDetail.reason, postDetail.reason.message);
  }

  async deletePost(userId: number, id: number) {
    const handleUser = () => userController.getUser({ id: userId }).then(user => {
      if (user.status === 'rejected') {
        return Promise.reject(formatResponse(500, user.reason, user.reason.message || '获取用户失败'));
      }

      if (!user.value) {
        return Promise.reject(formatResponse(500, {}, '获取用户不存在'));
      }

      return user.value;
    });

    const handlePost = () => prisma.post.delete({ where: { id } })
      .then(post => post)
      .catch(error => Promise.reject(formatResponse(500, error, error.message)));

    try {
      await handleUser();
      await handlePost();
      return formatResponse(200, {}, '删除成功');
    } catch (error: any) {
      return error;
    }
  }
}
