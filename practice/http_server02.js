const http = require('http');
const fs = require('fs'); //file system

const server = http.createServer((req, res) => {    
    //非同步讀取
    fs.writeFile(
        __dirname + '/./header.txt', //生成該txt檔案，匯出request 的header
        JSON.stringify(req.headers),  //將物件轉變為 JSON 字串
        error => {
            if(error){
                res.end(`<h1>錯誤:${error}</h1>`);
            } else {
                res.end(`<h2> ok </h2>`);
            }

        })
    
});

server.listen(3000);

/* 操作：
(1) 先在終端機用node開起這支檔案(node practice/http_server01.js )，沒開server就會顯示「無法顯示這個網站」
(2) 在server輸入網址 localhost:3000 
(3) 傳輸只會操作一次，若有文字更改，要讓終端機停下重啟
*/