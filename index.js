require('dotenv').config();
const express = require('express');
const axios = require('axios'); 
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 3000;
let db = require('./models')





app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

// GET / - main index of site
app.get('/', function(req, res) {
  db.pokemon.findAndCountAll()
  .then(favCount => {
    let favPokeCount = favCount.count;
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/?limit=151';
  // Use request to call the API
  axios.get(pokemonUrl).then( function(apiResponse) {
    var pokemon = apiResponse.data.results;
    res.render('index', { pokemon: pokemon.slice(0, 151), favPokeCount });
  })
  })
});



// Imports all routes from the pokemon routes file
app.use('/', require('./routes/pokemon'));


var server = app.listen(port, function() {
  console.log('...listening on', port );
});

module.exports = server;
