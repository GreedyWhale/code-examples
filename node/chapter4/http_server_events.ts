/*
 * @Description: http server events demo
 * @Author: MADAO
 * @Date: 2022-05-27 16:20:41
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-30 14:47:18
 */
import http from 'http';
import net from 'net';

const server = http.createServer();

server.on('checkContinue', (req, res) => {
  console.log('checkContinue 触发');
  res.writeContinue();
  res.end('hi');
});

server.on('clientError', (error, socket) => {
  console.log('clientError 触发了');
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.on('close', () => {
  console.log('close 触发了');
});

server.on('request', (req, res) => {
  if (req.url === '/bye') {
    server.close();
    res.end('bye');
    return;
  }

  res.end('hi');
});

server.on('connect', (req, socket, head) => {
  console.log('connect 触发');
});

server.on('connection', () => {
  console.log('connection 触发');
});

server.on('upgrade', (req, socket, header) => {
  console.log('upgrade 触发了', req, socket, header);
});

server.listen(1111, () => console.log('listening'));
