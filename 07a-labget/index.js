const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const axios = require('axios'); // for access to RESTful API

let app = express(); //create the express application
app.set('view engine', 'hbs'); // inform express that we are using hbs as the view engine
wax.on(hbs.handlebars); // enable wax-on for handlebars (for template inheritance)
wax.setLayoutPath('views/layouts') // inform wax-on where to find the layouts

app.use(express.urlencoded({
    'extended':false // for processing HTML forms usually it's false because
                     // HTML forms are usually quite simple
}))

const BASE_API_URL = 'https://ckx-movies-api.herokuapp.com/';

app.get('/',async function(req,res){
    let response = await axios.get(BASE_API_URL+"movies");
    let movies = response.data
    res.render('allMovies',{
        'allMovies': response.data
    });
})

app.get('/create',async function(req,res){
    let response = await axios.get(BASE_API_URL+"movies");
    let movies = response.data
    res.render('create')
});

app.post('/create',async function(req,res){
    let newMovie = {
        'title':req.body.title,
        'plot':req.body.plot
    }
    await axios.post(BASE_API_URL+"movie/create",newMovie);
    res.redirect('/');
})

// app.patch('/patch',async function(req,res){
//     let update = {
//         'title':req.body.title,
//         'plot':req.body.plot
//     }
//     await axios.patch(BASE_API_URL+"movie/create",newMovie);
//     res.redirect('/');
// })

app.listen(3000,function(){
    console.log("server started");
})