/*
 * @Description: 用于处理用户相关的请求
 * @Author: MADAO
 * @Date: 2022-01-26 11:39:03
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-14 21:31:55
 */
import type { UserQueryConditions } from '~/types/controller/user';

import sha3 from 'crypto-js/sha3';
import hex from 'crypto-js/enc-hex';
import { omit } from 'lodash';

import { prisma } from '~/utils/db';
import { promiseWithSettled } from '~/utils/promise';
import { formatResponse } from '~/utils/middlewares';

export default class UserController {
  static validator(username: string, password: string) {
    if (!/^[\w\d]{3,20}$/.test(username)) {
      return {
        passed: false,
        message: '用户名格式错误，用户名长度为3～20的字母或数字组成',
      };
    }

    if (!/^[\w\d]{6,15}$/.test(password)) {
      return {
        passed: false,
        message: '密码格式错误，密码长度为6～15的字母或数字组成',
      };
    }

    return {
      passed: true,
      message: '验证通过',
    };
  }

  static crypto(password: string) {
    return hex.stringify(sha3(password));
  }

  async getUser(condition: UserQueryConditions) {
    const user = await promiseWithSettled(prisma.user.findUnique({ where: condition }));
    return user;
  }

  async createUser(username: string, password: string) {
    const createParams = {
      data: {
        username,
        passwordDigest: UserController.crypto(password),
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
        updatedAt: true,
      },
    };
    const user = await promiseWithSettled(prisma.user.create(createParams));

    return user;
  }

  async signUp(username: string, password: string) {
    // 检查用户提交数据
    const testResult = UserController.validator(username, password);
    if (!testResult.passed) {
      return Promise.reject(formatResponse(422, {}, testResult.message));
    }

    // 检测用户是否已经存在
    const user = await this.getUser({ username });
    if (user.status === 'fulfilled' && user.value) {
      return Promise.reject(formatResponse(422, {}, '用户已存在，请直接登录'));
    }

    // 创建新用户
    const newUser = await this.createUser(username, password);
    if (newUser.status === 'rejected') {
      return Promise.reject(formatResponse(500, newUser.reason, newUser.reason.message || '创建用户失败，请稍后重试！'));
    }

    return formatResponse(200, newUser.value, '创建成功！');
  }

  async signIn(condition: UserQueryConditions, password?: string) {
    const user = await this.getUser(condition);

    if (user.status === 'rejected') {
      return formatResponse(500, user.reason, user.reason.message || '无法获取用户信息');
    }

    if (!user.value) {
      return formatResponse(404, {}, '用户不存在');
    }

    if (password && UserController.crypto(password) !== user.value.passwordDigest) {
      return formatResponse(422, {}, '用户密码错误');
    }

    return formatResponse(200, omit(user.value, ['passwordDigest']), '登录成功');
  }
}

