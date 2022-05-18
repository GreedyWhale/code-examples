/*
 * @Description: buffer demo
 * @Author: MADAO
 * @Date: 2022-05-10 17:47:55
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-11 11:59:55
 */
import fs from 'fs';
import path from 'path';

const buffer = Buffer.from('hello world', 'utf8');
buffer[0] = -1;
buffer[1] = 256;
buffer[2] = 3.14;
console.log(buffer); // <Buffer ff 00 03 6c 6f 20 77 6f 72 6c 64>

const buffer1 = Buffer.from('男人变态有什么错', 'utf8');
const str = buffer1.toString();

console.log(str);


const chunks: Buffer[] = [];
const rs = fs.createReadStream(path.join(__dirname, './demo1.txt'), { highWaterMark: 10 });

rs.on('data', (chunk) => {
  chunks.push(chunk as Buffer);
});

rs.on('end', () => {
  console.log(Buffer.concat(chunks).toString());
});

