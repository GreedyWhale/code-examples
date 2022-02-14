/*
 * @Description: 扩充next request api声明
 * @Author: MADAO
 * @Date: 2022-02-14 21:33:39
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-14 22:22:08
 */
declare module 'iron-session' {
  interface IronSessionData {
    SESSION_USER_ID?: number;
  }
}

export {};
