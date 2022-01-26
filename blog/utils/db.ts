/*
 * @Description: 数据库连接方法
 * @Author: MADAO
 * @Date: 2022-01-26 12:09:27
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 12:12:55
 */
import { PrismaClient } from '@prisma/client';

export const prisma = global.prisma || new PrismaClient({ log: ['query'] });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
