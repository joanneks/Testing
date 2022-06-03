const express= require('express');
const hbs = require('hbs');
const wax = require('wax-on')

const app = express();

app.set('view engine','hbs');
app.use(express.static('public'));
wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts')

app.get('/',function(req,res){
    res.render('index');
});

app.get('/report',function(req,res){
    res.render('report');
});

app.listen(3000,function(){
    console.log('server started')
});


