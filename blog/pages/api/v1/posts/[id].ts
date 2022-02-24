/*
 * @Description: 博客详情接口
 * @Author: MADAO
 * @Date: 2022-02-24 14:28:37
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-24 17:01:59
 */
import type { NextApiHandler } from 'next';

import PostController from '~/controller/post';
import { endRequest, checkRequestMethods, formatResponse } from '~/utils/middlewares';
import { withSessionRoute } from '~/utils/withSession';
import { SESSION_USER_ID } from '~/utils/constant';

const postController = new PostController();

const postDetailHandler:NextApiHandler = async (req, res) => {
  await checkRequestMethods(req, res, ['GET', 'PUT', 'DELETE']);
  const { id } = req.query;
  const { postData } = req.body;
  const userId = req.session[SESSION_USER_ID];

  if (req.method === 'GET') {
    const detail = await postController.getDetail(parseInt(id as string, 10));

    endRequest(res, detail);
  }

  if (typeof userId !== 'number') {
    endRequest(res, formatResponse(500, {}, '请先登录'));
    return;
  }

  if (req.method === 'PUT') {
    const result = await postController.upsertPost(userId, { ...postData, id: parseInt(id as string, 10) });
    endRequest(res, result);
  }

  if (req.method === 'DELETE') {
    const result = await postController.deletePost(userId, parseInt(id as string, 10));
    endRequest(res, result);
  }
};

export default withSessionRoute(postDetailHandler);
