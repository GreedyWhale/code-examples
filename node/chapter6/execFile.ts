/*
 * @Description: execFile
 * @Author: MADAO
 * @Date: 2022-07-22 15:44:56
 * @LastEditors: MADAO
 * @LastEditTime: 2022-07-22 16:09:41
 */
import { execFile } from 'child_process';
import path from 'path';

execFile(path.join(__dirname, './echo.sh'), (error, data) => {
  if (error) {
    throw error;
  }

  console.log(data.toString());
});

execFile('node', ['--version'], (error, data) => {
  if (error) {
    throw error;
  }

  console.log(data.toString());
});
