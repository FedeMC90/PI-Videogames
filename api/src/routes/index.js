const { Router } = require('express');
const { Videogame, Genres } = require('../db.js');
const axios = require('axios');
const { Op } = require('sequelize');
//const e = require('express');
const {
  API_KEY
} = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames', async(req, res) => {
  const {name} = req.query;
  let gamesByNameAPI = [];
  let pages = 5;
  
  try {
    for(let i=1; i<=pages; i++) {
      gamesByNameAPI = gamesByNameAPI.concat(await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
      .then(response => 
        response.data.results.map(({id, name, background_image, rating, genres}) => 
        ({
          id: id, 
          name: name, 
          background_image: background_image,
          rating: rating,
          genres: genres
        })))
      .catch(e => res.status(404).send('Error en la consulta con la API.')));
    }

    let gamesByNameDB = await Videogame.findAll({
      attributes: ['id', 'name', 'image', 'rating', 'genre']
    });

    var gamesByNameTot = gamesByNameAPI.concat(gamesByNameDB);  
  
    if (name) {
      gamesByNameTot = gamesByNameTot.filter(e => e.name.toLowerCase().includes(name.toLowerCase())).slice(0, 15);   
    }
  
    if (!gamesByNameTot.length)
        return res.status(404).send('No se encontraron juegos con ese nombre 3.')
  
    res.send(gamesByNameTot)
  } catch (error) {
    return res.status(404).send('Error .');
  }
});

router.get('/videogame/:idVideogame', async(req, res) => {
  const {idVideogame} = req.params;

  try {
    if (isNaN(idVideogame)) {
      //busca en la base de datos
      const game = await Videogame.findByPk(idVideogame, {
        include: [{
          model: Genres,
          attributes: ['id', 'name'],
          through: {
            attributes: []
          }
        }]
      });

      if (!game) 
        return res.status(404).send('El ID ingresado no existe.');
      
      res.send(game);
    } else {
      //busca en la api
      await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
      .then(response => 
        res.send({
          id: response.data.id, 
          name: response.data.name, 
          background_image: response.data.background_image,
          rating: response.data.rating,
          genres: response.data.genres,
          description: response.data.description,
          released: response.data.released,
          platforms: response.data.platforms
        }))
      .catch(e => res.status(404).send('El ID ingresado no existe.'));
    }
  } catch (error) {
    res.status(404).send(error);  
  }
});

router.get('/genres', async(req, res) => {
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(response => response.data.results)
    .catch(e => res.status(404).send('No se encontraron géneros.'));

  genres.map(e => Genres.findOrCreate({
    where: {
      id: e.id,
      name: e.name
    },
  }));

  genres = await Genres.findAll();

  res.send(genres);
});

router.post('/videogames', async(req, res) => {
  const {name, description, platforms} = req.body;

  try {
    if (!name || !description || !platforms)
    return res.status(400).send('Faltan datos obligatorios.');

    const newgame = await Videogame.create(req.body);

    res.json(newgame);    
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
