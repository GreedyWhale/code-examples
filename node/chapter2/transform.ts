/*
 * @Description: transform demo
 * @Author: MADAO
 * @Date: 2022-05-16 16:33:26
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 18:15:58
 */
import { Transform } from 'stream';

const transform = new Transform({
  transform(chunk, encoding, callback) {
    console.log(`输入 ${chunk}`);
    const transformedChunk = chunk.toString().toUpperCase();
    console.log(`输出 ${transformedChunk}`);
    callback();
  }
});

process.stdin
  .pipe(transform)
  .pipe(process.stdout);
