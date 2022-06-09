/*
 * @Description: websocket server demo
 * @Author: MADAO
 * @Date: 2022-06-06 15:32:41
 * @LastEditors: MADAO
 * @LastEditTime: 2022-06-09 16:56:15
 */
import net from 'net';
import crypto from 'crypto';

const server = net.createServer();
const parseHeaders = (headerStr: string) => {
  const headers: Record<string, string> = {};
  headerStr
    .split('\r\n')
    .slice(1)
    .filter(item => item)
    .forEach(item => {
      const [key, value] = item.split(':');
      headers[key.trim()] = value.trim();
    });

  return headers;
};

const decodeFrame = (frame: Buffer) => {
  const frameObj: Record<string, any> = {
    isFinal: (frame[0] & 0x80) === 0x80,
    res1: (frame[0] & 0x40),
    res2: (frame[0] & 0x20),
    res3: (frame[0] & 0x10),
    opcode: (frame[0] & 0x0F),
    masked: (frame[1] & 0x80) === 0x80,
    payloadLength: (frame[1] & 0x7F),
    maskingKey: [],
  }

  /**
   * 数据起始位置
   * 因为 FIN，RSV，opcode，masked，payload len
   * 总共占据2字节的位置
   */
  let dataStartPosition = 2;
  if (frameObj.payloadLength === 126) { // 需要解后面16位（2字节）的值
    dataStartPosition += 2;
    frameObj.payloadLength = frame.readUIntBE(2, 2);
  } else if (frameObj.payloadLength === 127) { // 需要解后面64位（8字节）的值
    dataStartPosition += 8;
  }

  if (frameObj.masked) {
    frameObj.maskingKey = frame.slice(dataStartPosition, dataStartPosition + 4);
    dataStartPosition += 4;
  }

  const payload = frame.slice(dataStartPosition, dataStartPosition + frameObj.payloadLength);
  if (frameObj.maskingKey.length){
    for (var i = 0; i < payload.length; i++){
      payload[i] = payload[i] ^ frameObj.maskingKey[i % 4];
    }
  }

  return {
    frame: frameObj,
    payload,
  }
};

const encodeFrame = (message: string) => {
  const length = Buffer.byteLength(message);
  // 数据的起始位置
  const index = 2;
  const response = Buffer.alloc(index + length);

  //第一个字节，fin位为1，opcode为1
  response[0] = 129;
  response[1] = length;

  response.write(message, index);

  return response;
};

server.on('connection', socket => {
  socket.once('data', data => {
    const requestHeaders = parseHeaders(data.toString());
    const key = crypto
      .createHash('sha1')
      .update(`${requestHeaders['Sec-WebSocket-Key']}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`)
      .digest('base64');

    const headers = [
      'HTTP/1.1 101 Switching Protocols',
      'Upgrade: websocket',
      'Connection: Upgrade',
      `Sec-WebSocket-Accept: ${key}`,
      '',
      ''
    ]

    socket.setNoDelay(true);
    socket.write(headers.join('\r\n'));
    socket.on('data', chunks => {
      const { frame, payload } = decodeFrame(chunks);
      console.log('接收到的数据', frame, payload.toString());
      socket.write(encodeFrame('hi, client!'));
    });
  });
});

server.listen(1111, () => console.log('listening'));
