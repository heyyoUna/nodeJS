const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {    
    fs.writeFile(
        __dirname + '/./header.txt',
        JSON.stringify(req.headers, null, 4), 
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