require('dotenv').config(); //載入.env的設定 //configuration 設定檔


const express = require('express');  //套件安裝進來的，所以不是給路徑
const multer = require('multer'); 
const fs = require('fs').promises; //file system
const session = require('express-session');
const moment = require('moment-timezone');
const upload = multer({dest: 'tmp_uploads/'}); //設定上傳暫存目錄
const uploadImg = require('./modules/upload-images');

const app = express(); 

//引入想要的套件；use不限定get/post方法，都收
app.set('view engine', 'ejs');

app.use(session ({
    saveUninitialized: false,   //如果session還沒初始化，是否儲存
    resave: false,  //強制回存
    //以上兩個預設值，目前是false，但後續可能改為true，所以會建議使用者先加

    secret: '34908-948dfgkpw;wkhoej;rjrpwn;;krot',  //亂數
    cookie: {
        maxAge : 1200000, //20min(單位毫秒)；如果不給，預設為視窗關掉才過期 
    }
}));

    // const urlencodedParser = express.urlencoded({extended: false});
    // const jsonParser = express.json(); 
app.use(express.urlencoded({extended: false})); //提升到頂層top middleware，所有要過去的人，都會經過
app.use(express.json());
app.use(express.static('public'));  //將含有靜態資產的目錄名稱傳遞給 express.static 中介軟體函數，就能直接開始提供檔案。
app.use('/jquery', express.static('./node_modules/jquery/dist'));
app.use('/bootstrap', express.static('./node_modules/bootstrap/dist'));

app.use((req, res, next) => {
    res.locals.title ='小新的網站';  //判斷變數有沒有傳過來
    // res.send('middleware'); //middleware不可使用res.，跑完此行就會結束
    next(); 
});


//路由定義開始 :BEGIN
app.get('/', (req, res) => {          //此處的get，是http的方法；括號內是處理器
    res.render('home', {name: 'Una'});     //對應views資料夾的home檔案，前面是檔名(不加副檔名)
    // res.send(`<h1>Hello World from file Index.js</h1>`)        //send會將字串視為html
}); 

res.locals.title = '首頁 - ' + res.locals.title;
res.render('home', {name: 'Una'});

app.get('/json-sales', (req, res) => {     
    const sales = require('./data/sales');     //載入後會把jaon內容轉化成原生的array/object納入
    // console.log(sales); 
    //http://localhost:3001/json-sales 確認連結
    //res.end/.send/.render/.json 都會把資料傳給用戶端，但目前沒有送任何東西出去
    //res.send會判斷內容是否為文字，若是，會在header告知轉為html
    //require會動態載入，但載入過的內容就會放到記憶體內，下次載入相同的資源，就不會重抓；因此更新內容後，要終止終端機，重啟！

    // res.json(sales); //把內容轉為json再丟回給用戶端
    res.render('json-sales', {sales}); 
});   

app.get('/try-qs', (req, res)=>{     //測試的路由
    res.json(req.query);
});   
// http://localhost:3001/try-qs
// http://localhost:3001/try-qs?a=2&b=3&b=7 兩個b會變成陣列



// app.post('/try-post', urlencodedParser, (req, res)=>{     //express預設情況下，不會像query去處理，所以需要middleware中介body-parser
//     res.json(req.body);
// });  
//https://stackoverflow.com/questions/29175465/body-parser-extended-option-qs-vs-querystring
app.post('/try-post',  (req, res)=>{     
    res.json(req.body);
});  


app.get('/try-post-form', (req, res)=>{     
    res.render('try-post-form');
});  

app.post('/try-post-form',  (req, res)=>{     
    res.render('try-post-form', req.body);
});  
app.get('/pending', (req, res)=>{ 

})


app.post('/try-upload', upload.single('avatar'),async (req, res)=>{ //single:此路由只要上傳單一檔案；avatar:檔案名
    if (req.file && req.file.mimetype==='image/jpeg'){
        try{        //錯誤處理 try & catch，錯誤處理只能一次，所以加return; try catch 不能用在非同步的promise，但await還是照順序的，await情況下可用。try catch 不能用在writefile，如果有錯誤，不會一開始就跳，要等全部跳完。
            await fs.rename(req.file.path, __dirname + '/public/img/' + req.file.originalname);     //要用await 記得前面要加async 
            return res.json({success: true, filename: req.file.originalname});          //如果有上傳檔案，且檔案的格式是img/jpg，才會把檔案搬到public/img資料夾，並維持原始檔名
        } catch(ex){
            return res.json({success: false, error: '無法存檔'});
        }    
 
    } else {
        await fs.unlink(req.file.path); //刪除暫存檔
        res.json({success: false, error: '格式不對'});
    }
});

app.post('/try-upload2', uploadImg.single('avatar'), async (req, res)=>{
    res.json(req.file);
});

app.post('/try-upload3', uploadImg.array('photo', 10), async (req, res)=>{
    res.json(req.files);
});


app.get('/my-params1/:action?/:id(\\d+)?', (req, res)=>{        //因為是字串，要兩個倒斜線
    res.json(req.params);
});

app.get(/^\/m\/09\/d{2}-?\d{3}-?\d{3}$/i, (req, res)=>{        
    let u = req.url.split('?')[0];
    u = u.slice(3);
    u = u.split('-').join('');

    res.json({
        url: req.url,
        mobile: u
    });
});

app.use(require('./routes/admin2'));    //沒給路徑相當於'/'
app.use('/admin3', require('./routes/admin3')); //前面是路徑
app.use('/address-book', require('./routes/address-book'));

app.get('/try-sess', (req, res)=>{
    req.session.myVar = req.session.myVar || 0;
    req.session.myVar++;

    res.json(req.session);
});

app.get('/try-moment', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';

    res.json({
        m1: moment().format(fm),
        m2: moment().tz('Europe/Berlin').format(fm),
        m3: moment().tz('Asia/Tokyo').format(fm),
    });
});

app.get('/try-db', async (req, res)=>{
    const [r] = await db.query("SELECT * FROM address_book WHERE `name` LIKE ?", ['%新%']);

    res.json(r);

});





// *** 路由定義結束 :END
app.use((req, res)=>{
    res.status(404).send(`<div><h1>不期不待<br>不受傷害</h1><img src="https://tinyurl.com/3bvh97s4" alt=""></div>`)
});


let port = process.env.PORT || 3000;  //如果有port 就用port，不然就用3000
app.listen(port, ()=>{      //正常啟動，後面的call back function 會被啟動
    console.log(`NODE_ENV: ${process.env.NODE_ENV}`); 
    console.log(`啟動： ${port}`, new Date());
});


/*
各個接收組：沒上傳表單body、路徑參數 params、單個檔案 file、多個檔案files、只有一個欄位但要上傳多個圖檔 array
 */
