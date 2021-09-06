const f1 = require('./arrow-func')  //相對路徑方式，可以不給副檔名
const f2 = require('./arrow-func') 

console.log('2:', __dirname );
console.log(f1(9));
console.log(f2(10));