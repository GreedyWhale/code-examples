/*
 * @Description: exec demo
 * @Author: MADAO
 * @Date: 2022-07-22 15:37:19
 * @LastEditors: MADAO
 * @LastEditTime: 2022-07-22 15:44:48
 */
import { exec, execSync } from 'child_process';

exec('ls -a', (error, data) => {
  if (error) {
    throw error;
  }

  console.log(data.toString());
});

const p = execSync('pwd');

console.log(p.toString());