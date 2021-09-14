
const db = require('./../modules/connect-mysql');


db.query("SELECT * FROM address_book_0814 LIMIT 2,3")
    .then(([r]) => {
        console.log(r);
        process.exit(); //跑完就結束了
    })
    .catch(ex=>{
        console.log(ex);
    })