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
