const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express();

app.set('view engine','hbs');
app.use(express.static('public'));
app.use(express.urlencoded({
    'extended':false
}));

wax.on(hbs.handlebars);
wax.setLayoutPath('views/layouts');

// ROUTES
app.get('/',function(req,res){
    res.send("Hello World");
});

app.get('/form',function(req,res){
    res.render('form.hbs');
});

app.post('/form',function(req,res){
    let item = req.body.item;
    let email = req.body.email;
    let lastSeen = req.body.lastSeen;
    let properties = req.body.properties
    properties = properties || [];
    properties = Array.isArray(properties)? properties:[properties];
    res.render('result',{
        'item': item,
        'email': email,
        'lastSeen': lastSeen,
        'properties': properties
    });
    // res.send("Form received");
    console.log(properties);
})

//SET SERVER
app.listen(3000,function(){
    console.log("server started");
});


