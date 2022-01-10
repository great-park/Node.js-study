//nodemon 서버로 실행할 것
const express = require('express');
const app = express();
//경로 처리
const path = require('path');
//port 라는 속성을 서버에 심는다.
app.set('port', process.env.PORT || 3000);

//mprgan 미들웨어
//dev - >클라이언트의 요청이 서버에 기록  , combined -> 좀 더 상세한 정보 (ip, 브라우저)
const morgan = require('morgan');
app.use(morgan('dev'));
//정적파일 제공, 요청경로: /                      실제경로: /public
app.use('/', express.static(path.join(__dirname, 'public')));

//cookie parsor 미들웨어
//쿠기가 있으면 알아서 파싱됨, 쿠키 조작
//cookieParsor메소드 안에 암호키 넣으면 암호화 가능
const cookieParsor = require('cookie-parser');
app.use(cookieParsor('password'));

//데어티 파싱 $$거의 필수$$  - req.body.name 이런식으로 데이터가 알아서 파싱됨
app.use(express.json()); // json 데이터를 파싱해서 req.body로 넣어줌
app.use(express.urlencoded({ extended: true})); //form 파싱 , true면 qs false면 querystring

const session = require("express-session"); //요청에 대한 객체 생성, 요청마다 개인 저장공간 생성
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : 'password',
    cookie:{
        httpOnly : true,
    }
}))
/* 미들웨어 - 모든 요청에서 실행할 코드 작성 app.use(미들웨어)  use 이외에도 get, post도 모두 미들웨어 장착
* 미들웨어는 next 매개변수를 실행해줘야 req.params와 일치하는 라우터를 실행
* 특정 req에서만 실행하고 싶으면 첫번째 매개변수에 주소 추가
* 연속으로 미들웨어 실행 가능 next()
* 단, 응답(send, sendFile, json 등)은 한 번만
* next에 매개변수가 없으면 다음 라우터 실행역할, error를 담으면 바로 에러처리 미들웨어로 넘아감
* next('route')의 경우 해당 미들웨어는 그 즉시 건너뛰고 다음 라우터를 실행. - if문을 통해 라우터 분기 처리 가능!
*/
app.use((req, res, next)=> {
    console.log('모든 요청에 실행');
    next();
}, (req, res, next)=>{
    try{
        console.log('no error');
    }catch(error){
        next(error);  //에러처리 미들웨어로 넘겨주기!
    }
})

//express에서 send가 http에서의 writehead, end를 동시에 해줌 - 웬만하면 express에서 이런식 편리하게 제공
//라우터들 , 작성시 위에서 아래로 차례대로 실행됨을 고려할 것
app.get('/about', (req,res)=>{
    res.send('hello express');
})

app.get('/', (req,res, next)=>{
    req.session.id = "hello";
    req.cookies // singedCookies = 암호화된 쿠키 사용
    //html 파일을 서빙
    res.sendFile(path.join(__dirname, './index.html'));  
    //쿠키 조작
    res.cookie('name', encodeURIComponent(name), {
        expires: new Date(),
        httpOnly: true,
        path: '/',
    })
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