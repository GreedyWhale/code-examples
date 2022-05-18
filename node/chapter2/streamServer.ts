/*
 * @Description: stream server
 * @Author: MADAO
 * @Date: 2022-05-11 12:48:58
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-16 14:04:13
 */
import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer();

server.on('request', (request, response) => {
  const ws = fs.createReadStream(path.join(__dirname, './largeFile.txt'));
  ws.pipe(response);
});


server.on('listening', () => console.log('start'));
server.listen(5555);
