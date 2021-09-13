const multer = require('multer');
const {v4: uuidv4} = require('uuid');

const extMap = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/gif': '.gif',
};

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, __dirname + '/../public/img')  // cb = call back； /../ 回上一層資料夾
    },
    filename:(req, file, cb)=>{
        cb(null, uuidv4() + extMap[file.mimetype])
    },


});

// 過濾掉不符合的檔案，就不會讓undefined發生
//在第一關filefilter有過，才會進到storage
const fileFilter = (req, file, cb)=>{
    cb(null, !!extMap[file.mimetype])
};

module.exports = multer({storage, fileFilter});