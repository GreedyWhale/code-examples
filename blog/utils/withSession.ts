/*
 * @Description: 添加cookie至next.js的api
 * @Author: MADAO
 * @Date: 2022-02-14 21:01:17
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-14 21:59:04
 */
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import { SESSION_USER_ID } from '~/utils/constant';

const sessionOptions = {
  password: process.env.COOKIE_PASSWORD as string,
  cookieName: SESSION_USER_ID,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Theses types are compatible with InferGetStaticPropsType https://nextjs.org/docs/basic-features/data-fetching#typescript-use-getstaticprops
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    _context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}
