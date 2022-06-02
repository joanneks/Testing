// we need to use Express for this, we are going to include
// the following line looks for express folder in node_modules
// and locate index.js there. The index.js will return an object
// and will be stored into const express
const express = require('express');

// create an express application
let app = express()

//add routes
// a route is a URL on our server
//first argument: path of the url
// second argument: a function that happens whena client tries to access the path
app.get("/",function(req,res){
    //first argument -- the request from the client
    // second argumnet -- the response which we are going to send back
    res.send("<h1>Hello World</h1>")
})

//any words or sequence of characters that : in front
// is a parameter or argument
app.get('/hello/:name',function(req,res){
    //res.send() can send back a string or an integer
    // but if it is an integer it must be a HTTP status code
    // e.g 200, 404, 500
    res.send("Hi, "+ req.params.name);
})

// we expect the URL to have two parameters in the query string
// which will be a and b
// e.g /calculate?a=3&b=4
app.get('/calculate',function(req,res){
    let a = parseInt(req.query.a);
    let b = parseInt(req.query.b);
    res.send("sum= "+(a+b));
})

app.get('/about-us',function (req,res){
    res.send("<h1>About us</h1><p>Abour our company</p>");
})


//start the server
//first arg:port number
app.listen(3000,function(){
    console.log("server started");
})
