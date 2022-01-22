/*
 * @Description: 测试数据库查询
 * @Author: MADAO
 * @Date: 2022-01-20 16:26:22
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-20 16:36:04
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Allen',
    },
  });

  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
