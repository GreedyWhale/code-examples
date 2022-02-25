/*
 * @Description: PostController类型声明
 * @Author: MADAO
 * @Date: 2022-02-23 14:50:42
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-25 11:31:03
 */
export interface PostData {
  title: string;
  content: string;
  introduction: string;
}

export type Labels = Array<{
  name: string;
  id?: number;
  action: 'add' | 'delete' | 'unchanged';
}>

export interface CreatePostParams extends PostData {
  id?: number;
}
