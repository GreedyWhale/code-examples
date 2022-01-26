/*
 * @Description: promise相关方法
 * @Author: MADAO
 * @Date: 2022-01-26 16:46:29
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 17:18:37
 */
import type { PromiseWithSettled } from '~/types/promise';

export const promiseWithSettled: PromiseWithSettled = promiseInstance => promiseInstance
  /*
   * 这里ts的写法很奇怪，我目前还想不到好的写法，
   * ts总是把status推导成string，所以这里用as强制转换类型
   */
  .then(result => ({ value: result, status: 'fulfilled' as 'fulfilled' }))
  .catch(error => ({ reason: error, status: 'rejected' }));
