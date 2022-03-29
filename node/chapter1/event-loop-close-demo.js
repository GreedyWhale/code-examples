/*
 * @Description: event loop close 阶段例子
 * @Author: MADAO
 * @Date: 2022-03-29 15:54:42
 * @LastEditors: MADAO
 * @LastEditTime: 2022-03-29 17:34:20
 */
const net = require('net');

const server = net.createServer(socket => {
  socket.on('close', () => {
    console.log('close');
    process.exit();
  });
  socket.on('data', (data) => {
    console.log(`data: ${data}`);
    socket.destroy();
  });
});

setTimeout(() => {
  const client = new net.Socket();
  client.connect(4000, () => {
    client.write('hello world');
  });
}, 1000);

server.listen(4000, () => console.log('listening'));
