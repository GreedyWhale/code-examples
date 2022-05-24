/*
 * @Description: tcp client demo
 * @Author: MADAO
 * @Date: 2022-05-23 11:19:36
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-24 11:53:51
 */
import net from 'net';

const client = net.connect({ port: 5555 }, () => {
  console.log('Connection successful');
});

client.on('data', chunk => {
  const data = chunk.toString();

  console.log('client 接收到：', data);
});

client.on('timeout', () => {
  console.log('timeout');
});

client.setTimeout(3000);
