//nodemon 서버로 실행할 것
const express = require('express');
const app = express();
//경로 처리
const path = require('path');

/* 미들웨어 - 모든 요청에서 실행할 코드 작성 app.use(미들웨어)  use 이외에도 get, post도 모두 미들웨어 장착
* 미들웨어는 next 매개변수를 실행해줘야 req.params와 일치하는 라우터를 실행
* 특정 req에서만 실행하고 싶으면 첫번째 매개변수에 주소 추가
* 연속으로 미들웨어 실행 가능 next()
* 단, 응답(send, sendFile, json 등)은 한 번만
*/
app.use((req, res, next)=> {
    console.log('모든 요청에 실행');
    next();
})

//port 라는 속성을 서버에 심는다.
app.set('port', process.env.PORT || 3000);

//express에서 send가 http에서의 writehead, end를 동시에 해줌
//라우터들 , 작성시 위에서 아래로 차례대로 실행됨을 고려할 것
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

//404 - 요청한 라우터 존재 x
app.use((req, res, next)=>{
    res.status(404).send('404 error');
})

//에러 미들웨어 - 반드시 매개변수 4가지를 입력해야됨
app.use((err, req, res, next)=>{
    console.error(err);
    res.send('Error');
})

app.listen(app.get('port'), ()=>{
    console.log('express server starts, 3000');
});