/*
 * @Description: client connect demo
 * @Author: MADAO
 * @Date: 2022-05-30 11:50:43
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-30 15:49:48
 */
import http from 'http';
import { URL } from 'url';
import net from 'net';

const proxy = http.createServer();

proxy.on('connect', (req, clientSocket, head) => {
  const { host, port } = new URL(`http://${req.url!}`);
  const serverSocket = net.connect(Number(port || 80), host, () => {
    clientSocket.write(
      'HTTP/1.1 200 Connection Established\r\n' +
      'Proxy-agent: Node.js-Proxy\r\n' +
      '\r\n'
    );

    console.log('head', head.toString());
    serverSocket.write(head);
    clientSocket.pipe(serverSocket);
    serverSocket.pipe(clientSocket);
  });
});

proxy.listen(1111, () => {
  const req = http.request({
    port: 1111,
    host: 'localhost',
    method: 'CONNECT',
    path: 'www.baidu.com:80',
  });

  req.on('connect', (res, socket, head) => {
    console.log('got connected!');

    socket.write(
      'GET / HTTP/1.1\r\n' +
      'Host: www.baidu.com:80\r\n' +
      'Connection: close\r\n' +
      '\r\n' +
      'GET http://www.baidu.com:80 HTTP/1.1\r\n\r\n',
    );
    socket.on('data', (chunk) => {
      console.log(chunk.toString());
    });
    socket.on('end', () => {
      proxy.close();
    });
  });

  req.write(JSON.stringify({ message: 'hello' }));
  req.end();
});
