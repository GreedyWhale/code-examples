/*
 * @Description: PostController类型声明
 * @Author: MADAO
 * @Date: 2022-02-23 14:50:42
 * @LastEditors: MADAO
 * @LastEditTime: 2022-02-23 15:24:15
 */
export interface PostData {
  title: string;
  content: string;
  introduction: string;
}

export interface CreatePostParams extends PostData {
  id?: number;
}
