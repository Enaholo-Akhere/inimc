const express = require('express');
const bp = require('body-parser');
const handlebars = require('express-handlebars');
const connection = require("./connections")
const path = require('path');
const emprout = require('./Routes/router')
const app = express();

app.use(bp.urlencoded({
    extended: true
}));

app.use('/emp', emprout);

app.set('views', path.join(__dirname, '/views'))

app.use(express.static(path.join(__dirname, '/public')));

app.engine('hbs', handlebars({
    extname: '.hbs',
    defaultLayout: "main",
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))

app.set('view engine', 'hbs')


app.get('/', (req, res)=>{
    res.render('index.hbs')
});




app.listen(2500, function(err){
    if(err){
        throw err;
    }else{
        console.log("success")
    }
})