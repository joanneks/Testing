const express =require('express');
const hbs =require('hbs');
const wax =require('wax-on');

//create express application
const app = express();
// inform express we are using hbs as the view engine
app.set('view engine','hbs');
app.use(express.static('public'));

//enable wax-on for handlebars(for template inheritance)
wax.on(hbs.handlebars);
//inform wax-on where to find the layouts
wax.setLayoutPath('views/layouts');

//for processing HTML forms, usually its false because the HTML forms are usually quite simple
app.use(express.urlencoded({
    'extended':false
}));

//routes
app.get('/',function(req,res){
    //req is request from client. all data from client are inside req
    //res is for us to send back to client
    res.send('hello world');
    //must ensure that the function will eventually at least one res.send
    //only one res.send can be executed
    //the following functions are considered variants of res.send:
    //res.render(), res.json(), res.status() and res.send()
    //all send back response, only one of them can be executed per function
    //take note:res.send or res.json etc is not a return (i.e does not end the function)
})

app.get('/fruits',function(req,res){
    res.render('fruit-form');
});

app.post('/fruits',function(req,res){
    // send the body of the form back to the client for visual inspection
    let fruits = [];

    // if req.body.item is already an array, no further processing
    if (Array.isArray(req.body.items)){
        fruits =req.body.items;
    } else{
    // if req.body.item is a single item then convert it into an array
        if (req.body.items){
            fruits=[req.body.items];
        } else{
    // if req.body.item is undefined (or otherwise falsely) then the result is an empty array            
            //redundant because we have already declared fruits as an empty array
            fruits = [];
        }
    }

    //METHOD 1
    let total = 0;
    for(let eachFruit of fruits){
        if (eachFruit=='apple'){
            total +=3;
        }
        if (eachFruit=='durian'){
            total +=15;
        }
        if (eachFruit=='orange'){
            total +=6;
        }
        if (eachFruit=='banana'){
            total +=4;
        }
    }

    //METHOD 2
    // let total = 0;
    // for (let eachFruit of fruits) {
    //     switch(eachFruit) {
    //         case 'apple':
    //             total += 3
    //             break;
    //         case 'durian':
    //             total += 15;
    //             break;
    //         case 'orange':
    //             total += 6
    //             break;
    //         case 'banana':
    //             total += 4;
    //             break;
    //     }
    // }

    res.render('total', {'total':total});

});

//lookup table for METHOD 3
// const fruitPrices = {
//     'apple': 3,
//     'durian': 15,
//     'orange': 6,
//     'banana': 4
// }

app.listen(3000,function(){
    console.log('server started');
});