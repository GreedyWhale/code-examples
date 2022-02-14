/*
 * @Description: 接口中间件
 * @Author: MADAO
 * @Date: 2022-01-26 17:19:02
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-14 22:32:59
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import type { ResponseData, ResponseStatusCode, ResponseMessageMap } from '~/types/api';

import { SESSION_USER_ID } from '~/utils/constant';

const messages: ResponseMessageMap = {
  200: '请求成功',
  204: 'No Content',
  401: '用户认证失败',
  403: '权限不足',
  404: '未找到相关资源',
  405: '请求方法不允许',
  422: '请求参数，请检查后重试',
  500: '服务器出错',
};

export const formatResponse = <T>(code: ResponseStatusCode, data?: T, message?: string) => ({
  code,
  data: data || {},
  message: message || messages[code],
});

export const endRequest = <T>(res: NextApiResponse, data: ResponseData<T>, headers?: Record<string, string>) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  if (headers) {
    Object.entries(headers).forEach(item => {
      const [key, value] = item;
      res.setHeader(key, value);
    });
  }

  res.status(data.code);
  res.json(data);
};

export const checkRequestMethods = async (req: NextApiRequest, res: NextApiResponse, allowedMethods: string[]) => {
  if (allowedMethods.includes(req.method || '')) {
    return Promise.resolve(true);
  }

  const data = formatResponse(405);
  endRequest(res, data, { Allow: allowedMethods.join(',') });
  return Promise.reject(new Error('请求方法不允许'));
};

export const setCookie = async (req: NextApiRequest, value: any) => {
  req.session[SESSION_USER_ID] = value;
  await req.session.save();
};
