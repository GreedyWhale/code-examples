/*
 * @Description: https client demo
 * @Author: MADAO
 * @Date: 2022-06-02 17:07:05
 * @LastEditors: MADAO
 * @LastEditTime: 2022-06-02 18:23:51
 */
import https from 'https';
import fs from 'fs';
import os from 'os';
import path from 'path';

const req = https.request({
  hostname: 'localhost',
  port: 1111,
  path: '/',
  method: 'GET',
  key: fs.readFileSync(path.join(os.homedir(), '/code/tls/client.key')),
  cert: fs.readFileSync(path.join(os.homedir(), '/code/tls/client.crt')),
  ca: fs.readFileSync(path.join(os.homedir(), '/code/tls/ca.crt')),
  rejectUnauthorized: false,
});

req.on('response', res => {
  res.on('data', data => {
    console.log('data', data.toString());
  });
});

req.end();
