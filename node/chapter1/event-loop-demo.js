/*
 * @Description: event loop promise & process.nextTick 阶段例子
 * @Author: MADAO
 * @Date: 2022-03-29 17:35:23
 * @LastEditors: MADAO
 * @LastEditTime: 2022-03-29 17:55:15
 */

// setTimeout(() => {
//   console.log('timers');
//   setTimeout(() => {
//     console.log('setTimeout');
//   }, 0);

//   Promise.resolve('promise').then(res => console.log(res));
//   process.nextTick(() => {
//     console.log('nextTick');
//     process.nextTick(() => console.log('nextTick1'));
//   });

//   setImmediate(() => console.log('setImmediate'));
// }, 0);

const fn = () => {
  console.log('fn');
  process.nextTick(fn);
}

setTimeout(() => {
  setTimeout(() => console.log('setTimeout'));
  fn();
}, 0);
