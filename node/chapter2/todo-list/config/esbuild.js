/*
 * @Description: https://jamesthom.as/2021/05/setting-up-esbuild-for-typescript-libraries/
 * @Author: MADAO
 * @Date: 2022-05-17 11:00:37
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-17 11:18:47
 */
const esbuild = require('esbuild');
const path = require('path');
const { nodeExternalsPlugin } = require('esbuild-node-externals');

esbuild.build({
  entryPoints: [
    path.join(__dirname, '../lib/cli.ts'),
  ],
  outfile: path.join(__dirname, '../bin/cli.js'),
  bundle: true,
  minify: true,
  platform: 'node',
  target: 'node16',
  plugins: [
    nodeExternalsPlugin(),
  ],
});
