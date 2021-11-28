//nodemon 서버로 실행할 것
const express = require('express');


const app = express();

//port 라는 속성을 서버에 심는다.
app.set('port', process.env.PORT || 3000);
//

app.get('/', (req,res)=>{
    res.send('hello express');
})
app.listen(app.get('port'), ()=>{
    console.log('express server starts, 3000');
});