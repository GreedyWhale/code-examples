/*
 * @Description: post 相关接口
 * @Author: MADAO
 * @Date: 2022-02-23 14:44:53
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-24 15:38:20
 */
import type { NextApiHandler } from 'next';

import { endRequest, checkRequestMethods, formatResponse } from '~/utils/middlewares';
import { SESSION_USER_ID } from '~/utils/constant';
import PostController from '~/controller/post';
import { withSessionRoute } from '~/utils/withSession';

const postController = new PostController();

const postsHandler: NextApiHandler = async (req, res) => {
  await checkRequestMethods(req, res, ['POST']);

  const { postData } = req.body;
  const userId = req.session[SESSION_USER_ID];

  if (req.method === 'POST') {
    if (!userId) {
      return endRequest(res, formatResponse(422, {}, '请先登录'));
    }

    const post = await postController.upsertPost(userId, postData);
    endRequest(res, post);
  }
};

export default withSessionRoute(postsHandler);
