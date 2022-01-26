/*
 * @Description: ~/utils/promise
 * @Author: MADAO
 * @Date: 2022-01-26 17:11:21
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 17:11:21
 */

export type PromiseWithSettled = {
  <T>(promiseInstance: Promise<T>): Promise<{
    value: T;
    status: 'fulfilled'
  } | {
    reason: any;
    status: 'rejected'
  }>
};
