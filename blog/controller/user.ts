/*
 * @Description: 用于处理用户相关的请求
 * @Author: MADAO
 * @Date: 2022-01-26 11:39:03
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 17:07:40
 */
import sha3 from 'crypto-js/sha3';
import hex from 'crypto-js/enc-hex';

import { prisma } from '~/utils/db';
import { promiseWithSettled } from '~/utils/promise';

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

  async getUser(condition: Partial<{
    id: number;
    username: string;
  }>) {
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
}

