/*
 * @Description: duplex demo
 * @Author: MADAO
 * @Date: 2022-05-16 15:13:59
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 16:33:28
 */
import { Duplex } from 'stream';

let charCode = 65;

const duplex = new Duplex({
  read () {
    const chunk = String.fromCharCode(charCode);
    console.log(`读取 ${chunk}`);
    this.push(chunk);
    charCode++;
    if (charCode > 70) {
      this.push(null);
    }
  },
  write (chunk, encoding, callback) {
    console.log(`写入 ${chunk}`);
    callback();
  }
});

duplex.pipe(process.stdout);
