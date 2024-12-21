const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

let app = express();

// 1B. SETUP VIEW ENGINE
app.set('view engine', 'hbs'); 

// 1C. SETUP STATIC FOLDER
app.use(express.static('public'));

// 1D. SETUP WAX ON (FOR TEMPLATE INHERITANCE)
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

app.get('/', function(req, res){
    res.render('index.hbs');
})

// add routes here 
app.get('/', function(req,res){
    res.send("<h1>Hello from Express</h1>");
})


app.listen(3000, ()=>{
    console.log("Server started")
})

