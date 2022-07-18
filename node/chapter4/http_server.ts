/*
 * @Description: http server demo
 * @Author: MADAO
 * @Date: 2022-05-26 10:24:14
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-26 16:48:22
 */
import http from 'http';

const server = http.createServer();

server.on('request', (req, res) => {
  res
    .writeHead(200, {
      'content-type': 'application/json; charset=UTF-8',
      // 'cache-control': 'public, max-age=60000'
      'Last-Modified': new Date().toISOString(),
    })
    .end(JSON.stringify({ message: 'Restlessness' }));
});

server.listen(1111, () => console.log('listening'));
