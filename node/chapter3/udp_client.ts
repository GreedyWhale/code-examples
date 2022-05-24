/*
 * @Description: client demo
 * @Author: MADAO
 * @Date: 2022-05-24 17:19:13
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-24 17:30:34
 */
import dgram from 'dgram';

const client = dgram.createSocket('udp4');

client.on('connect', () => {
  console.log('connect');
});

client.connect(123, '0.0.0.0', () => {
  console.log(1);
});