/*
 * @Description: 文件操作
 * @Author: MADAO
 * @Date: 2022-05-17 17:29:25
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-18 18:27:25
 */
import os from 'os';
import path from 'path';
import fsPromises from 'fs/promises';
import fs from 'fs';

export type TodoList = {
  name: string;
  description: string;
  done: boolean;
  updatedAt: string;
  createdAt: string;
  completedAt: string;
}[];

export const storagePath = path.join(process.env.HOME || os.homedir(), '.todo_list');


const checkFile = async () => {
  const isExisted = await fsPromises.stat(storagePath)
    .then(stats => stats.isFile())
    .catch(() => false);

  return isExisted;
};

export const read = async (index?: number) => {
  const isExisted = await checkFile();

  if (!isExisted) {
    return [];
  }

  return new Promise<TodoList>((resolve, reject) => {
    const readable = fs.createReadStream(storagePath);
    let chunks: Buffer[] = [];
    readable.on('error', (error) => {
      reject(error);
    });

    readable.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    readable.on('end', () => {
      const todoList: TodoList = JSON.parse(Buffer.concat(chunks).toString());
      if (index) {
        resolve(todoList.filter((value, _index) => _index === index));
        return;
      }

      resolve(todoList);
    });
  });
};

export const write = async (todoItem: Partial<TodoList[number]> | null, length = 1, index?: number) => {
  const oldData = await read();
  const timestamp = new Date().toLocaleDateString();
  const isUpdate = index !== undefined;
  let data = [];
  if (isUpdate) {
    if (todoItem === null) {
      oldData.splice(index, 1);
    } else {
      oldData.splice(index, 1, todoItem as TodoList[number]);
    }
  } else {
    data = new Array(length).fill({
      ...todoItem,
      done: false,
      updatedAt: timestamp,
      createdAt: timestamp,
      completedAt: '',
    });
  }

  return fsPromises.writeFile(storagePath, JSON.stringify(isUpdate ? oldData : oldData.concat(data)));
};

export const remove = async () => {
  const isExisted = await checkFile();

  if (!isExisted) {
    return true;
  }

  return fsPromises.unlink(storagePath);
};