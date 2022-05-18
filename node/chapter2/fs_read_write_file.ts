/*
 * @Description: fs.readFile / fs.writeFile
 * @Author: MADAO
 * @Date: 2022-05-10 16:12:59
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-10 16:25:34
 */
import fs from 'fs';
import path from 'path';

fs.readFile(path.join(__dirname, './demo.txt'), 'utf8', (error, data) => {
  if (error) {
    throw error;
  }

  console.log('fs.readFile', data);
});

fs.writeFile(path.join(__dirname, './demo.txt'), '\n什么都别说，重复是你最好的选择', { flag: 'a' }, (error) => {
  if (error) {
    throw error;
  }

  console.log('fs.write');
});