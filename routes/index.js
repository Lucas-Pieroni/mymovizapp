var express = require('express');
var router = express.Router();
var request = require ('sync-request');
const mongoose = require('mongoose');
const moviesModel = require ('../models/movies')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* GET popular movie page via API. */
router.get('/new-movies', function(req, res, next) {
  const newPopMovies = request ("GET", "https://api.themoviedb.org/3/movie/popular?api_key=d6f94a456bcb2b808997b9b33db3ade2&language=fr-FR&page=1")
  const newPopMoviesParse = JSON.parse(newPopMovies.body)
  console.log("interrogation API", newPopMoviesParse)
  console.log("interrogation API clef result", newPopMoviesParse.results)
  const popMoviesResults = newPopMoviesParse.results
  res.json(popMoviesResults);
});

/* POST update wish list. */
router.post('/wishlist-movie',async function(req, res, next) {
  console.log("req.body", req.body) 
  
  var newMovie = new moviesModel({
    movieName : req.body.name,
    img : req.body.img
  }) 
console.log("nv film:", newMovie)
  var movieSaved = await newMovie.save()
  console.log("nouveau film sauvegardé", movieSaved)

  res.json({movieSaved});
});

/* DELETE movie. */
router.delete('/wishlist-movie/:name',async function(req, res, next) {
console.log ("req params:", req.params.name)
  const deleteMovie = await moviesModel.deleteOne({movieName: req.params.name})
  console.log("deleteMovie=", deleteMovie)
  var resultDeleteMovie = false;
  if (deleteMovie.deletedCount === 1){
    resultDeleteMovie = true
  }
  res.json({resultDeleteMovie});
});

/* GET vue de la BDD*/
router.get('/wishlist-movie',async function(req, res, next) {
  var movies = await moviesModel.find()
  console.log("vue de la BDD à jour", movies)
  res.json(movies);
});


module.exports = router;
