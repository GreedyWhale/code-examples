/*
 * @Description: udp server demo
 * @Author: MADAO
 * @Date: 2022-05-24 16:33:29
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-24 17:21:11
 */
import dgram from 'dgram';

const server = dgram.createSocket('udp4');

server.on('message', (message, rinfo) => {
  console.log(`服务端接收到来自：${rinfo.address}:${rinfo.port} 的 ${message.toString()}`);

  const replyMessage = Buffer.from('I am the server');

  server.send(replyMessage, rinfo.port, rinfo.address);
  process.nextTick(() => server.close());
});

server.on('close', () => {
  console.log('close');
});

server.on('connect', () => {
  console.log('connect');
});

server.bind(12345, () => {
  const address = server.address();
  console.log(`server listening: ${address.address}:${address.port}`);
});
