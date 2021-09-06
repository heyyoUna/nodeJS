const http = require('http');

const server = http.createServer((req, res) => {    //request, response(server response)
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(`<h1>Hola, ${req.url}</h1>`) //改字之後，要讓終端機停下重啟
});

server.listen(3000);

/* 操作：
(1) 先在終端機用node開起這支檔案(node practice/http_server01.js )，沒開server就會顯示「無法顯示這個網站」
(2) 在server輸入網址 localhost:3000 
(3) 傳輸只會操作一次，若有文字更改，要讓終端機停下重啟
*/