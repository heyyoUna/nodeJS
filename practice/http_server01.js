const http = require('http'); //載入node.js 原生模組

const server = http.createServer((req, res) => {    //建立server；request, res(server response)
//要求回傳的格式＆內容
    res.writeHead(200, {'Content-Type': 'text/html'}); //statusCode, statusMessage, headers
    res.end(`<h1>Hola, ${req.url}</h1>`) //回應給的call back 內容
});

server.listen(3000); //進入此網站的監聽port

/* 操作：
(1) 先在終端機用node開起這支檔案(node practice/http_server01.js )，沒開server就會顯示「無法顯示這個網站」
(2) 在server輸入網址 localhost:3000 
(3) 傳輸只會操作一次，若有文字更改，要讓終端機停下重啟
*/