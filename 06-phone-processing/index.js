const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');

const app = express ();
app.set('view engine','hbs');
app.use(express.static('public'));


//IMPORTANT
//setup express to process forms
app.use(express.urlencoded({
    'extended': false // use extended: true if you are processing object in objects in a form
}))

function processCheckbox(checkboxes){
    let values = checkboxes;
    if(!values){
        values=[];
    } else if(Array.isArray(values) == false){
        values = [values];
    };
    return values
}

wax.on(hbs.handlebars);
wax.setLayoutPath('views/layouts');

//2. Routes
app.get('/',function(req,res){
    res.send('Hello World')
})

app.get ('/add-food',function(req,res){
    res.render('add');
});

app.post('/add-food',function(req,res){
    // the content of the form is in req
    console.log(req.body);
    let fruit = req.body.fruitName;
    let calories = req.body.calories;
    let meal = req.body.meal;

    //if 2 or more checkboxes checked, save as it is
    //if only 1 checkbox is checked, return an array with only the checkbox's calue
    //if no checkboxes are checked, return an empty array
    
    
    //tags will be undefined if users never selects any of the checkboxes
    //undefined is falsely value, !tags == !undefined ==!false == true
    //METHOD 1
    // if(!tags){
    //     tags=[];
    // }else if(Array.isArray(tags) == false){
    //         tags = [tags];
    //     };

    //METHOD 2
    // tags = Array.isArray(tags) ? tags:tags?[tags]:[];
    //OR
    // tags=tags||[];
    // tags = Array.isArray(tags) ? tags: [tags];
    let tags = processCheckbox(req.body.values);    
    console.log("tags = ",tags)
        
    res.render('result',{
        'fruits':fruit,
        'meal':meal,
        'claories':calories,
        'tags':tags
    });
});


app.listen(3000,function(){
    console.log('server started')
})