const f1 = a=>a*a;
const f3 = a=>a*a*a;

// console.log(f1(7));
console.log('1:', __dirname );

//個別傳公式
    // module.exports = f1; //匯出
    // module.exports = f3;      //如果沒加這句，套到require的算法還是只有f1 ，所以console.log('f3:', f3(2)) 會跑出 4

//一次傳多公式(陣列)
module.exports = {f1, f3}; //es6語法，