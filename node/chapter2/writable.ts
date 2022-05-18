/*
 * @Description: Writable demo
 * @Author: MADAO
 * @Date: 2022-05-13 15:20:42
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 12:05:52
 */
import { Writable } from 'stream';

const writable = new Writable({
  write: (chunk, encoding, callback) => {
    console.log(`你输入的是：${chunk.toString()}`);
    callback();
  }
});

process.stdin.pipe(writable);
