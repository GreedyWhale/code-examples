/*
 * @Description: 测试label的创建、更新和删除
 * @Author: MADAO
 * @Date: 2022-02-25 11:32:08
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-25 15:20:53
 */
import type { Post } from 'prisma/prisma-client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PostParams {
  title: string;
  content: string;
  introduction: string;
  labels: {
    name: string;
    id?: number;
    action: 'add' | 'delete' | 'unchanged';
  }[];
}

const data: PostParams = {
  title: '测试文章',
  introduction: '用于测试label的创建、更新和删除',
  content: '用于测试label的创建、更新和删除',
  labels: [
    { name: '标签三', action: 'add' },
    { name: '标签四', action: 'add' },
  ],
};

const handle = async () => {
  const { labels, ...rest } = data;
  await prisma.post.upsert({
    where: { id: -1 },
    create: {
      ...rest,
      author: {
        connect: { id: 5 },
      },
      labels: {
        connectOrCreate: labels.filter(label => label.action === 'add').map(label => ({
          where: { name: label.name },
          create: { name: label.name },
        })),
      },
    },
    update: {
      ...rest,
      author: {
        connect: { id: 5 },
      },
      labels: {
        connectOrCreate: labels.filter(label => label.action === 'add').map(label => ({
          where: { name: label.name },
          create: { name: label.name },
        })),
        delete: labels.filter(value => value.action === 'delete').map(value => ({
          id: value.id,
        })),
      },
    },
  }).then((res: Post) => console.log(res));

  await prisma.$disconnect();
};

handle();
