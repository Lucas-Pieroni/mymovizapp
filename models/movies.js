const mongoose = require('mongoose');

const movieSchema = mongoose.Schema ({
    movieName : String,
    img : String
})

const moviesModel = mongoose.model('movies', movieSchema)

module.exports = moviesModel;