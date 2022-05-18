/*
 * @Description: 操作todo list的方法
 * @Author: MADAO
 * @Date: 2022-05-17 15:59:53
 * @LastEditors: MADAO
 * @LastEditTime: 2022-05-18 18:30:03
 */
import type { TodoList } from './db';

import inquirer from 'inquirer';
import ora from 'ora';

import { write, read, storagePath, remove } from './db';

const spinner = ora();
spinner.color = 'blue';

export const addTodoItems = async (name?: string, description?: string, option?: { multiple: string }) => {
  spinner.info('添加待办事项');
  try {
    // 不通过问答的方式添加
    if (name) {
      spinner.start('添加中...');
      await write({ name, description }, option?.multiple ? parseInt(option.multiple, 10) : undefined);
      spinner.succeed('添加成功!');
      return;
    }

    // 问答式
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: '请输入待办事项的名字（必传）：',
          validate: (name: string) => {
            if (!name) {
              return '请输入待办事项的名字';
            }

            return true;
          },
        },
        { type: 'input', name: 'description', message: '请输入待办事项的描述（可选）：', default: '' },
        { type: 'number', name: 'number', message: '请输入添加的数量（可选）：', default: 1 },
      ])
      .then((value: { name: string; description: string; number: number; }) => {
        spinner.start('添加中...');
        return value;
      })
      .then(value => write({ name: value.name, description: value.description }, value.number))
      .then(() => spinner.succeed('添加成功!'));
  } catch (error) {
    spinner.fail(`添加失败: ${(error as Error).message}`)
  }
};

export const showTodoList = () => {
  spinner.start('查询中...');
  read()
    .then(todoList => {
      if (todoList.length) {
        spinner.succeed('所有待办事项');
        todoList.forEach(todoItem => {
          console.log("=".repeat(20));
          console.log(`待办事项：${todoItem.name}`);
          console.log(`描述：${todoItem.description || ""}`);
          console.log(`状态：${todoItem.done ? "完成" : "未完成"}`);
          console.log(`创建日期：${todoItem.createdAt}`);
          console.log(`更新日期：${todoItem.updatedAt}`);
          console.log(`完成日期：${todoItem.completedAt}`);
        });
        return;
      }

      spinner.prefixText = '🍙';
      spinner.text = '暂无待办事项';
      spinner.stopAndPersist();
    })
    .catch(error => spinner.fail(`查询异常: ${error.message}`));
};

const askForAction = () => inquirer
  .prompt([{
    name: 'action',
    type: 'list',
    choices: [
      { name: '返回', value: 'goBack' },
      { name: '修改标题', value: 'changeTitle' },
      { name: '修改描述', value: 'changeDesc' },
      { name: '已完成', value: 'done' },
      { name: '未完成', value: 'undone' },
      { name: '删除', value: 'delete' },
    ],
  }])
  .then(value => value.action);

const getNewTodoItem = async (params: {
  action: 'changeTitle' | 'changeDesc' | 'done' | 'undone' | 'delete',
  index: number,
}) => {
  const item = (await read(params.index))[0];
  const timestamp = new Date().toLocaleDateString();
  item.updatedAt = timestamp;
  switch (params.action) {
    case 'changeTitle':
      const name = await inquirer.prompt([{
        name: 'name',
        type: 'input',
        message: '请输入新的标题',
        default: item.name
      }]).then(value => value.name);
      return {
        ...item,
        name
      };

    case 'changeDesc':
      const description = await inquirer.prompt([{
        name: 'desc',
        type: 'input',
        message: '请输入新的描述',
        default: item.description
      }]).then(value => value.desc);
      return {
        ...item,
        description,
      };

    case 'done':
      return {
        ...item,
        done: true,
        completedAt: timestamp,
      };

    case 'undone':
      return {
        ...item,
        done: true,
        completedAt: '',
      };

    case 'delete':
      return null;

    default:
      break;
  }
}

const updateTodoList = (params: {
  index: number;
  item: TodoList[number] | null | undefined;
}) => {
  if (params.item === undefined) {
    return;
  }

  return write(params.item, 1, params.index);
};

export const editTodoList = async (isRepeated: boolean = false) => {
  if (!isRepeated) {
    spinner.info('编辑待办事项');
  }

  try {
    const todoList = await read();
    let index = -1;
    inquirer
      .prompt([{
        name: 'index',
        type: 'rawlist',
        message: '请选择你要操作的待办事项',
        choices: todoList.map((todoItem, index) => ({
          name: `${todoItem.name}-${todoItem.done ? '已完成' : '未完成'}`,
          value: index
        }))
      }])
      .then(value => {
        index = value.index;
        return askForAction();
      })
      .then(action => {
        if (action === 'goBack') {
          editTodoList(false);
          return;
        }

        return getNewTodoItem({ index, action })
      })
      .then(item => updateTodoList({ index, item }))
      .then(() => {
        spinner.succeed('操作完成');
        editTodoList(false);
      })
  } catch (error) {
    spinner.fail(`编辑异常: ${(error as Error).message}`);
  }
};

export const clearTodoList = async () => {
  spinner.start('清除中...');
  try {
    await remove()
    spinner.succeed('清除成功');
  } catch (error) {
    spinner.fail(`清除失败: ${(error as Error).message}`);
    spinner.fail(`请手动删除: ${storagePath}`);
  }
}

export const printStoragePath = () => {
  spinner.info(`储存路径: ${storagePath}`);
};

