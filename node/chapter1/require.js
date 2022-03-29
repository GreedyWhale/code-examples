/*
 * @Description: Commonjs demo
 * @Author: MADAO
 * @Date: 2022-03-29 17:10:53
 * @LastEditors: MADAO
 * @LastEditTime: 2022-03-29 17:34:45
 */
const { sayGoodbye, sayHello } = require('./exports');
const { sayName, sayAge } = require('./exports1');
const done = require('./exports2');


sayGoodbye();
sayHello();

sayName();
sayAge();

done();

console.log(error);