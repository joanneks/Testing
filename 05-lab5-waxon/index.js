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

app.get('/fault-list',function(req,res){
    res.render('fault-list');
});

// app.get('/fruits',function(req,res){
//     res.render('fruits',{
//         'fruits':['apples', 'oranges', 'pears','mangosteens']
//     })
// });

app.get('/fruits',function(req,res){
    let dishes = [
        {
            'name':'Chicken Rice',
            'calories':700,
            
        },
        {
            'name':'Roasted Duck Rice',
            'calories':600,
        },
        {
            'name':'Wanton Mee',
            'calories':500,
        },
    ]
    res.render('fruits',{
        'fruits':['apples','oranges','pears','mangosteens'],
        'dishes': dishes,
        'favouriteDrink':''
    })
});


app.listen(3000,function(){
    console.log('server started')
});



// register our customer handlebar helpers
//-ifEquals-
//the callback function has 3 arguments:
// arg 2 is the data from the hbs
// hbs.handlebars.registerHelper('ifEquals', function(arg1,arg2,arg3){
    if(arg1==arg2){
        options.fn(this);
    }else{
        options.inverse(this)
    }
})

