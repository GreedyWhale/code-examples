/*
 * @Description: 根据标签搜索文章
 * @Author: MADAO
 * @Date: 2022-02-25 12:33:56
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-25 15:21:17
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handle = async (label: string) => {
  await prisma.post.findMany({
    where: {
      labels: {
        some: {
          name: label,
        },
      },
    },
    include: {
      labels: true,
    },
  }).then(post => {
    console.log(post);
  });

  await prisma.$disconnect();
};

handle('标签四');
