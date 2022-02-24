/* eslint-disable no-alert */
import type { NextPage } from 'next';

import React from 'react';
import axios from 'axios';

import { withSessionSsr } from '~/utils/withSession';
import { SESSION_USER_ID } from '~/utils/constant';
import styles from '~/styles/Home.module.scss';

const Home: NextPage<{ userId: number; }> = props => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [post, setPost] = React.useState({
    title: '',
    introduction: '',
    content: '',
  });
  const [postDetail, setPostDetail] = React.useState({
    title: '',
    introduction: '',
    content: '',
    author: {
      id: -1,
      username: '',
    },
  });
  const [postId, setPostId] = React.useState(-1);

  const handleSignUp = () => {
    axios.post('/api/v1/user', { username, password })
      .then(response => {
        alert('注册成功');
        console.log('response', response);
      })
      .catch(error => {
        alert('注册失败');
        console.log('error', error);
      });
  };

  const handleSignIn = (type: 'cookie' | 'userInfo') => {
    console.log(props.userId);
    const params = type === 'cookie' ? {} : { username: 'user', password: '123456' };
    axios.get('/api/v1/user', { params })
      .then(() => alert('登录成功'));
  };

  const handleSignOut = () => axios.delete('/api/v1/user').then(() => alert('登出成功'));

  const handleSubmit = (id?: number) => {
    if (id) {
      axios.put(`/api/v1/posts/${id}`, { postData: post })
        .then(response => console.log(response));

      return;
    }

    axios.post('/api/v1/posts', { postData: post })
      .then(response => console.log(response));
  };

  const handleUpdatePosts = () => {
    axios.get(`/api/v1/posts/${postId}`)
      .then(response => setPostDetail(response.data.data));
  };

  const handleDeletePost = () => {
    axios.delete(`/api/v1/posts/${postId}`)
      .then(response => setPostDetail(response.data.data));
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <section>
          <h1>注册</h1>

          <div className={styles.inputWrap}>
            <label htmlFor="Username">用户名</label>
            <input
              type="text"
              placeholder="Username"
              name="Username"
              onChange={event => setUsername(event.currentTarget.value)}
            />
          </div>

          <div className={styles.inputWrap}>
            <label htmlFor="Password">密码</label>
            <input
              type="password"
              placeholder="Password"
              name="Password"
              onChange={event => setPassword(event.currentTarget.value)}
            />
          </div>

          <button onClick={handleSignUp}>提交</button>
        </section>

        <section>
          <button onClick={() => handleSignIn('userInfo')}>使用用户名/密码登录</button>
          <button onClick={() => handleSignIn('cookie')}>使用cookie登录</button>
        </section>

        <section>
          <button onClick={handleSignOut}>登出</button>
        </section>

        <section>
          <h1>创建文章</h1>
          <input type="text" placeholder="请输入博客标题" onChange={event => setPost(prev => ({ ...prev, title: event.target.value }))} />
          <input type="text" placeholder="请输入博客简介" onChange={event => setPost(prev => ({ ...prev, introduction: event.target.value }))} />
          <textarea placeholder="请输入博客内容" onChange={event => setPost(prev => ({ ...prev, content: event.target.value }))}></textarea>
          <br />
          <button onClick={() => handleSubmit()}>提交</button>
        </section>

        <section>
          <h1>获取文章详情</h1>
          <div>
            <h3>{postDetail.title}</h3>
            {/* <p>{postDetail.author.username}</p> */}
            <p>{postDetail.introduction}</p>
            <p>{postDetail.content}</p>
          </div>
          <br />
          <input type="number" placeholder="请输入博客id" onChange={event => setPostId(parseInt(event.target.value, 10))} />
          <button onClick={handleUpdatePosts}>获取文章</button>
        </section>

        <section>
          <h1>更新文章</h1>
          <input type="text" placeholder="请输入博客标题" onChange={event => setPost(prev => ({ ...prev, title: event.target.value }))} />
          <input type="text" placeholder="请输入博客简介" onChange={event => setPost(prev => ({ ...prev, introduction: event.target.value }))} />
          <textarea placeholder="请输入博客内容" onChange={event => setPost(prev => ({ ...prev, content: event.target.value }))}></textarea>
          <br />
          <button onClick={() => handleSubmit(4)}>提交</button>
        </section>

        <section>
          <h1>删除文章</h1>
          <input type="number" placeholder="请输入博客id" onChange={event => setPostId(parseInt(event.target.value, 10))} />
          <button onClick={handleDeletePost}>提交</button>
        </section>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps = withSessionSsr(async context => ({
  props: {
    userId: context.req.session[SESSION_USER_ID] || -1,
  },
}));
