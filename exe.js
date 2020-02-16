const http = require('http');
const urlTool = require('url');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/h51021',{useNewUrlParser: true, useUnifiedTopology: true});
const Schema = new mongoose.Schema({
    username: String,
    password: String
});
const userModel = mongoose.model('user', Schema);
mongoose.connection.on('open', function(){
    const server = http.createServer((request, response)=>{
        let urlData = http.urlTool.parse(request.url, true);
        if (request.method.toUpperCase() === 'GET' && urlData.pathname === '/login') {
            //写入数据 {username: '', password: }
            UserModel.create(urlData.query, (err, data) => {
                if (err) throw err;
                console.log(data);
                //写入成功
                response.end('successfully login');
            });

        } else {
            response.end('ok');
        }
    })
    server.listen(8000,()=>{
        console.log('is running....')
    })
})
