/*
 * @Description: 接口相关类型声明
 * @Author: MADAO
 * @Date: 2022-01-26 17:29:48
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 17:41:27
 */
export type ResponseStatusCode = 200
| 204
| 401
| 403
| 404
| 405
| 422
| 500;

export type ResponseData<T> = {
  code: ResponseStatusCode;
  data: T;
  message: string;
};

export type ResponseMessageMap = {
  [key in ResponseStatusCode]: string;
};
