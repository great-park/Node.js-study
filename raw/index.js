const express = require('express');
const app =express();
const mysql=require('mysql');
const server = app.listen(3001, function(){
    console.log("express server start");
})

//쿼리스트링
app.get('/test/:id', function(req, res){

    const userId = req.params.id;

    const connection = mysql.createConnection({
        host: 'test-1.c0ewkxiorgu8.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'park',
        password: 'fa1735fa',
        database: 'test-1'
    })

    connection.connect();

    const getUserQuery = `SELECT * FROM User WHERE id = ${userId};`
    const getUserResult = connection.query(getUserQuery, function(err, rows, fileds){
        if(err){
            res.send("Error 발생");
        }else{
            console.log(rows);
            res.send(rows);
        }
    })
});

//post 
app.post('/signup', function(req, res){
    const userId = req.params.id;

    const connection = mysql.createConnection({
        host: 'test-1.c0ewkxiorgu8.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'park',
        password: 'fa1735fa',
        database: 'test-1'
    })

    connection.connect();

    const signupQuery = `INSERT INTO User (id, name, age) VALUES (5,'Choi',25);`
    const signupResult = connection.query(signupQuery, function(err, rows, fileds){

    })
})

