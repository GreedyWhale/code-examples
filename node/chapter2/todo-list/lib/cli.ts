#!/usr/bin/env node

/*
 * @Description: todo-list 入口文件
 * @Author: MADAO
 * @Date: 2022-05-17 10:39:43
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-18 18:37:40
 */
import { program } from 'commander';

import { version } from '../package.json';
import {
  addTodoItems,
  showTodoList,
  editTodoList,
  printStoragePath,
  clearTodoList,
} from './action';

program
  .name('todo-list')
  .description('一个简单的待办事项命令行工具')
  .version(version);

program
  .command('add')
  .description('添加一个待办事项')
  .argument('[name]', '待办事项的名称')
  .argument('[description]', '待办事项的简短描述')
  .option('-m, --multiple <number>', '添加多个')
  .action(addTodoItems);

program
  .command('list')
  .description('展示待办事项')
  .action(showTodoList);

program
  .command('edit')
  .description('编辑待办事项')
  .action(editTodoList);

program
  .command('path')
  .description('显示本地储存路径')
  .action(printStoragePath);

program
  .command('clear')
  .description('清除本地数据')
  .action(clearTodoList);


program.parse();
