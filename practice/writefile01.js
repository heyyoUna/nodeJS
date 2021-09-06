const fs = require('fs');

const data = {
    name: 'David',
    age : 28
}

fs.writeFile(
    'data.json',    //檔案名
    JSON.stringify(data, null, 4),  //轉換為json 字串 
    error => {  //call back function
        if(error) {
            console.log('無法寫入檔案:', error);
            process.exit(); //結束程式
        }
    console.log('寫入成功');
});

//https://nodejs.org/api/fs.html#fs_filehandle_writefile_data_options