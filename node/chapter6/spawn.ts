/*
 * @Description: spawn demo
 * @Author: MADAO
 * @Date: 2022-07-22 14:52:25
 * @LastEditors: MADAO
 * @LastEditTime: 2022-07-22 15:29:28
 */
import { spawn, spawnSync } from "child_process";

const p = spawn('/Applications/QQ.app/Contents/MacOS/QQ');

p.stdout.on('data', (chunks) => console.log(`p spawn stdout: ${chunks.toString()}`));
p.stderr.on('data', (chunks) => console.log(`p spawn stderr: ${chunks.toString()}`));

// const p1 = spawnSync('pwd');
// console.log(`p1 ${p1.stdout.toString()}`);
// console.log(`p1 ${p1.stderr.toString()}`);
