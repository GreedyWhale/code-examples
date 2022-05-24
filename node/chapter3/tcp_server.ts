/*
 * @Description: tcp server demo
 * @Author: MADAO
 * @Date: 2022-05-23 11:09:07
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-24 11:54:23
 */
import net from 'net';

const server = net.createServer(socket => {
  socket.write('hi');
  socket.pipe(socket);
});

server.listen(5555, () => console.log('start!'));
