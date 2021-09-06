//個別公式傳進來的方法
    // const f1 = require('./arrow-func')  //匯入套件，相對路徑方式，可以不給副檔名
    // const f2 = require('./arrow-func')  //f2 也被套進f1的算法公式
    // const f3 = require('./arrow-func') 


    console.log('2:', __dirname );
    // console.log('f1(3):', f1(3));
    // console.log('f2(10)', f2(10)); 
    // console.log('f3(2):', f3(2));

    
//一次傳多公式(陣列)
const {f1, f3: f4 } = require('./arrow-func');
const f2 = require(__dirname + '/arrow-func');

console.log('f1(9)', f1(9));
console.log('f4(10)', f4(10));

//再從眾公式中，選擇要用的
    console.log('f2.f1(5):', f2.f1(5)); //f2套用f1的公式
    console.log('f2.f3(5)', f2.f3(5)); //f2套用f3的公式

