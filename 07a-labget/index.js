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
    // console.log(movies)
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

app.get('/movie/edit/:movie_id',async function(req,res){
    let movieId = req.params.movie_id
    let url = BASE_API_URL + 'movie/' + movieId;
    let response = await axios.get(url);
    let movieSelected = response.data;
    
    res.render('update',{
        'id':movieId,
        'title':movieSelected.title,
        'plot':movieSelected.plot
    })
})

app.post('/movie/edit/:movie_id',async function(req,res){
    let movieId = req.params.movie_id
    let title = req.body.title;
    let plot = req.body.plot;
    let url = BASE_API_URL + "movie/" + movieId;
    console.log(url);
    let updateMovie = {
        'id':movieId,
        'title':title,
        'plot':plot
    }
    await axios.patch(url,updateMovie);
    res.redirect('/');
});

app.get('/movie/delete/:movie_id',async function(req,res){
    let movieId = req.params.movie_id
    let url = BASE_API_URL + "movie/" + movieId;
    let response = await axios.get(url);
    let movieSelected = response.data;
    res.render('delete',{
        'title':movieSelected.title,
        'plot':movieSelected.plot
    })
});

app.post('/movie/delete/:movie_id',async function(req,res){
    let movieId = req.params.movie_id;
    let url = BASE_API_URL + "movie/" + movieId;
    await axios.delete(url);
    res.redirect('/');
});

app.listen(3000,function(){
    console.log("server started");
})