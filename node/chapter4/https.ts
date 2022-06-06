/*
 * @Description: https demo
 * @Author: MADAO
 * @Date: 2022-06-02 17:07:05
 * @LastEditors: MADAO
 * @LastEditTime: 2022-06-02 18:07:54
 */
import https from 'https';
import fs from 'fs';
import os from 'os';
import path from 'path';

const server = https.createServer({
  key: fs.readFileSync(path.join(os.homedir(), '/code/tls/server.key')),
  cert: fs.readFileSync(path.join(os.homedir(), '/code/tls/server.crt')),
});

server.on('request', (req, res) => {
  res.statusCode = 200;
  res.end('hello world');
})

server.listen('1111', () => {
  console.log('listening');
});
