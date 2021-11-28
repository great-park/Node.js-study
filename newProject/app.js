//nodemon 서버로 실행할 것
const express = require('express');
const app = express();
//경로 처리
const path = require('path');

/* 모든 요청에서 실행할 코드 작성
* 미들웨어는 next 매개변수를 실행해줘야 req.params와 일치하는 라우터를 실행
*/
app.use((req, res, next)=> {
    console.log('모든 요청에 실행');
    next();
})

//port 라는 속성을 서버에 심는다.
app.set('port', process.env.PORT || 3000);
//

//라우터들 
app.get('/about', (req,res)=>{
    res.send('hello express');
})

//html 파일을 서빙
app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, './index.html'));
})

//와일드 카드 - 라우팅 분리
app.get('/category/:name', (req, res)=>{
    res.send(`hello ${req.params.name}`);
})



app.listen(app.get('port'), ()=>{
    console.log('express server starts, 3000');
});