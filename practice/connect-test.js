require('dotenv').config(); //連動.env 帳密
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,    
});

connection.query(
    "SELECT * FROM address_book_0814 LIMIT 5",
    (error, r)=>{   //result
        console.log(r);
        //非同步的狀態，跑完不會結束
        // process.exit();  
    });
