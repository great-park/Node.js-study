//nodemon 서버로 실행할 것
const express = require('express');
//경로 처리
const path = require('path');


const app = express();

//port 라는 속성을 서버에 심는다.
app.set('port', process.env.PORT || 3000);
//

app.get('/about', (req,res)=>{
    res.send('hello express');
})

//html 파일을 서빙
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, './index.html'));
})


app.listen(app.get('port'), ()=>{
    console.log('express server starts, 3000');
});