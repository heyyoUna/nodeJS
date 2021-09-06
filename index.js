require('dotenv').config(); //載入.env的設定
const express = require('express');  //這是套件安裝進來的，所以不是給路徑

const app = express(); 

app.use(express.static('public'));  //在啟動的工作目錄(根目錄)，就會出現此資料夾(靜態內容｀)

//路由方法：GET method route
//路由定義開始 :BEGIN
app.get('/', (req, res) => {          //此處的get，是http的方法；括號內是處理器
    res.send(`<h1>Hello World</h1>`)        //send會將字串視為html
});   


// *** 路由定義結束 :END
app.use((req, res)=>{
    res.status(404).send(`<h1>我找不到～<br>也到不了</h1>`)
})


let port = process.env.PORT || 3000;  //如果有port 就用port，不然就用3000
app.listen(port, ()=>{      //正常啟動，後面的call back function 會被啟動
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
    console.log(`啟動： ${port}`, new Date());
});