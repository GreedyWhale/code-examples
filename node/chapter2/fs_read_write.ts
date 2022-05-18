/*
 * @Description: fs.open / fs.write demo
 * @Author: MADAO
 * @Date: 2022-05-10 10:42:35
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-10 15:49:20
 */
import fs from 'fs';
import EventEmitter from 'events';
import path from 'path';

const eventHub = new EventEmitter();

eventHub.on('error', (error: Error) => {
  console.error(error.message);
});

eventHub.on('close', (fd: number) => {
  fs.close(fd, (error) => {
    if (error) {
      eventHub.emit('error', error);
      return;
    }

    console.log('fs.close', fd);
  })
});

eventHub.on('open', (fd: number) => {
  fs.read(fd, (error, bytesRead, data) => {
    if (error) {
      eventHub.emit('error', error);
      return;
    }

    console.log('fs.read', data.toString())
    eventHub.emit('write', fd);
  });
});

eventHub.on('write', (fd: number) => {
  fs.write(fd, '\n什么都别说，重复是你最好的选择', (error, written, data) => {
    if (error) {
      eventHub.emit('error', error);
      return;
    }

    console.log('fs.write', data.toString());
    eventHub.emit('close', fd);
  });
});

fs.open(path.join(__dirname, './demo.txt'), 'r+', (error, fd) => {
  if (error) {
    eventHub.emit('error', error);
    return;
  }

  eventHub.emit('open', fd);
});

