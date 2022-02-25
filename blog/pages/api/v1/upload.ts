/*
 * @Description: 图片上传接口
 * @Author: MADAO
 * @Date: 2022-02-25 15:53:58
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-25 17:16:03
 */
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const [filename, extname] = file.originalname.split('.');
    cb(null, `${filename}_${Date.now()}.${extname}`);
  },
  destination: path.join(process.cwd(), '/static/images/posts'),
});

const uploader = multer({
  storage,
  fileFilter: (req, file, cb) => {
    try {
      const isPassed = /^image.*/.test(file.mimetype);
      cb(null, isPassed);
    } catch (error: any) {
      cb(error);
    }
  },
  limits: {
    fileSize: 10485760,
  },
});

/**
 * @see https://nextjs.org/docs/api-routes/api-middlewares
 */
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, middleware: (..._rest: any[]) => any) => new Promise((resolve, reject) => {
  middleware(req, res, (result: any) => {
    if (result instanceof Error) {
      return reject(result);
    }

    return resolve(result);
  });
});

const imageHandle:NextApiHandler = async (req, res) => {
  const a = await runMiddleware(req, res, uploader.any());

  // @ts-ignore
  console.log(a, req.files);

  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.status(200);
  res.json({
    code: 200,
    // @ts-ignore
    data: req.files[0],
    message: '上传成功',
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default imageHandle;
