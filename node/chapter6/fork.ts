/*
 * @Description: fork
 * @Author: MADAO
 * @Date: 2022-07-22 16:06:19
 * @LastEditors: MADAO
 * @LastEditTime: 2022-07-22 16:09:10
 */
import { fork } from 'child_process';
import path from 'path';

fork(path.join(__dirname, './index.js'));