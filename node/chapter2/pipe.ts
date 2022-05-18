/*
 * @Description: pipe demo
 * @Author: MADAO
 * @Date: 2022-05-11 17:48:55
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-11 18:07:04
 */
import { Readable, Writable } from 'stream';

const readable = new Readable();

readable.push('其实长谷川先生只是运气不好罢了');
readable.push('MADAO 总会开花的');
readable.push(null);

const writable = new Writable({
  write (chunks, encoding, callback) {
    console.log(chunks.toString());
    callback();
  }
});

readable.pipe(writable);