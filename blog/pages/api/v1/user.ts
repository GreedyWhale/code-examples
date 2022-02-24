/*
 * @Description: 用户相关接口
 * @Author: MADAO
 * @Date: 2022-01-26 14:41:08
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-23 10:31:22
 */
import type { NextApiHandler } from 'next';
import type { User } from '@prisma/client';
import type { ResponseData } from '~/types/api';

import UserController from '~/controller/user';
import { checkRequestMethods, endRequest, formatResponse, setCookie } from '~/utils/middlewares';
import { withSessionRoute } from '~/utils/withSession';
import { SESSION_USER_ID } from '~/utils/constant';

const userController = new UserController();

const user: NextApiHandler = async (req, res) => {
  await checkRequestMethods(req, res, ['POST', 'GET', 'DELETE']);
  const { username, password } = req.body;

  try {
    if (req.method === 'POST') {
      const user = await userController.signUp(username, password);
      return endRequest(res, user);
    }

    if (req.method === 'GET') {
      const id = req.session[SESSION_USER_ID];
      const { username, password } = req.query;
      let user: ResponseData<User | {}> | null = null;

      if (username && password) {
        user = await userController.signIn({ username: username as string }, password as string);
      } else if (id) {
        user = await userController.signIn({ id });
      }

      if (user) {
        if (user.code === 200) {
          await setCookie(req, (user.data as User).id);
        } else {
          req.session.destroy();
        }

        endRequest(res, user);
        return;
      }

      req.session.destroy();
      endRequest(res, formatResponse(401, {}, '用户身份验证失败'));
      return;
    }

    if (req.method === 'DELETE') {
      req.session.destroy();
      endRequest(res, formatResponse(204, {}, '退出成功'));
      return;
    }
  } catch (error: any) {
    return endRequest(res, error);
  }
};

export default withSessionRoute(user);
