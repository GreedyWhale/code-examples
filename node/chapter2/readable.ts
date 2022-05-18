/*
 * @Description: readable demo
 * @Author: MADAO
 * @Date: 2022-05-13 10:56:36
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 14:42:40
 */
import { Readable } from 'stream';

let charCode = 65;

const readable = new Readable({
  read(size) {
    const chunk = String.fromCharCode(charCode++);
    this.push(chunk);
    if (charCode >= 70) {
      this.push(null);
    }
  }
});

readable.pipe(process.stdout);
