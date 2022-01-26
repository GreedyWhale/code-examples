/* eslint-disable no-alert */
import type { NextPage } from 'next';

import React from 'react';
import axios from 'axios';

import styles from '~/styles/Home.module.scss';

const Home: NextPage = () => {
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
      </main>
    </div>
  );
};

export default Home;
