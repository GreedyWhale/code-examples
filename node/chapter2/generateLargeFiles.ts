/*
 * @Description: 生成一个大文件
 * @Author: MADAO
 * @Date: 2022-05-11 12:41:41
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-11 12:51:59
 */
import fs from 'fs';
import path from 'path';

const main = () => {
  let counts = 1;

  const ws = fs.createWriteStream(path.join(__dirname, './largeFile.txt'));
  while (counts < 10000000) {
    ws.write(`这是第 ${counts} 行\n`);
    counts += 1;
  }

  ws.end();
  console.log('文件生成完毕');
};

main();
