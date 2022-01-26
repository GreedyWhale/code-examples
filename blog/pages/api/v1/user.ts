/*
 * @Description: 用户相关接口
 * @Author: MADAO
 * @Date: 2022-01-26 14:41:08
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 17:57:08
 */
import type { NextApiHandler } from 'next';

import UserController from '~/controller/user';
import { formatResponse, checkRequestMethods, endRequest } from '~/utils/middlewares';

const userController = new UserController();

const user: NextApiHandler = async (req, res) => {
  await checkRequestMethods(req, res, ['POST']);
  const { username, password } = req.body;

  // 检查用户提交数据
  const testResult = UserController.validator(username, password);
  if (!testResult.passed) {
    endRequest(res, formatResponse(422, {}, testResult.message));
    return;
  }

  // 检测用户是否已经存在
  const user = await userController.getUser({ username });
  if (user.status === 'fulfilled' && user.value) {
    endRequest(res, formatResponse(422, {}, '用户已存在，请直接登录'));
    return;
  }

  // 创建新用户
  const newUser = await userController.createUser(username, password);
  if (newUser.status === 'rejected') {
    endRequest(res, formatResponse(500, newUser.reason, newUser.reason.message || '创建用户失败，请稍后重试！'));
    return;
  }

  endRequest(res, formatResponse(200, newUser.value, '创建成功！'));
};

export default user;
