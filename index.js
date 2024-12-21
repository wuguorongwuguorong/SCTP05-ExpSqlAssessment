const express = require('express');
const hbs = require('hbs');

let app = express();

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs'); 

// add routes here 
app.get('/', function(req,res){
    res.send("<h1>Hello from Express</h1>");
})


app.listen(3000, ()=>{
    console.log("Server started")
})

