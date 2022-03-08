/*
 * @Description: 创建用户
 * @Author: MADAO
 * @Date: 2022-03-08 11:35:36
 * @LastEditors: MADAO
 * @LastEditTime: 2022-03-08 11:36:43
 */

/*
 * @Description: 测试label的创建、更新和删除
 * @Author: MADAO
 * @Date: 2022-02-25 11:32:08
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-25 15:20:53
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const handle = async () => {
  await prisma.user.create({
    data: {
      username: 'test1',
      passwordDigest: 'xxxxxxxxxxx',
    },
  });

  await prisma.$disconnect();
};

handle();
