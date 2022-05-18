/*
 * @Description: drain demo
 * @Author: MADAO
 * @Date: 2022-05-16 12:07:25
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 14:39:12
 */
import { Writable } from 'stream';

let i = 1000000;
let ok = true;
const writable = new Writable({
  write(chunk, encoding, callback) {
    callback();
  }
});

const main = () => {
  while (i >= 0 && ok) {
    ok = writable.write(`${i}`);
    i--;
  }

  if (i > 0) {
    console.log('数据发生积压');
    writable.once('drain', main);
  }

  if (i === 0) {
    console.log('done');
    writable.end();
  }
};

main();
