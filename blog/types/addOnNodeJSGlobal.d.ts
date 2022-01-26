/*
 * @Description: 扩展nodejs global对象
 * @Author: MADAO
 * @Date: 2022-01-26 12:10:34
 * @LastEditors: MADAO
 * @LastEditTime: 2022-01-26 12:12:43
 */
import type { PrismaClient } from '@prisma/client';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}
