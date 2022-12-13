const { Router } = require('express');
const { Videogame, Genres, Platform } = require('../db.js');
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
  let gamesAPI = [];
  let pages = 5;
  
  try {
    
    // Trae pasa 5 páginas para traer 100 juegos de la API
    for(let i=1; i<=pages; i++) {
      gamesAPI = gamesAPI.concat(await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)
      .then(response => 
        response.data.results.map(e => 
        ({
          id: e.id, 
          name: e.name, 
          background_image: e.background_image,
          rating: e.rating,
          genres: e.genres.map(e => {return {name: e.name}}),
          platforms: e.platforms.map(e => {return {name: e.platform.name}})
        })))
      .catch(e => res.status(404).send('Error en la consulta con la API.')));
    }

    // Trae todos los juegos de la db
    let gamesDB = await Videogame.findAll({
      include: [{
        model: Genres,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }, {
        model: Platform,
        attributes: ['name'],
        through: {
          attributes: []
        }
    }]});

    // Concatena los juegos de la API con los de la db
    var gamesTot = gamesAPI.concat(gamesDB);  
  
    // Si hay un filtro por nombre los filtra
    if (name) {
      gamesTot = gamesTot.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));   
    }
  
    // Si no encontró nada
    if (!gamesTot.length) {
      return res.status(200).send('No se encontraron juegos con ese nombre.')
    }
  
    res.send(gamesTot)
  } catch (error) {
    res.status(404).send('Error.');
  }
});

router.get('/videogame/:id', async(req, res) => {
  const {id} = req.params;

  try {
    // Si el ID enviado NO es un número va a buscarlo a la db
    if (isNaN(id)) {
      const game = await Videogame.findByPk(id, {
        include: [{
          model: Genres,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }, {
          model: Platform,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      ]
      });

      if (!game) 
        return res.status(404).send('El ID ingresado no existe.');
      
      res.send(game);
    } else { // si no, busca en la API
      await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then(response => 
        res.send({
          id: response.data.id, 
          name: response.data.name, 
          background_image: response.data.background_image,
          rating: response.data.rating,
          genres: response.data.genres.map(e => {return {name: e.name}}),
          description: response.data.description_raw,
          released: response.data.released,
          platforms: response.data.platforms.map(e => {return {name: e.platform.name}}),
        }))
      .catch(e => res.status(404).send('El ID ingresado no existe.'));
    }
  } catch (error) {
    res.status(404).send(error);  
  }
});

router.get('/genres', async(req, res) => {
  // Trae los géneros de la API
  let genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then(response => response.data.results)
    .catch(e => res.status(404).send('No se encontraron géneros.'));

  // Los crea en la db si no están
  genres.map(e => Genres.findOrCreate({
    where: {
      id: e.id,
      name: e.name
    },
  }));

  // Los traigo desde la db
  genres = await Genres.findAll();

  res.send(genres);
});

router.get('/platforms', async(req, res) => {
  // Trae los géneros de la API
  let platforms = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then(response => response.data.results)
    .catch(e => res.status(404).send('No se encontraron plataformas.'));

  // Los crea en la db si no están
  platforms.map(e => Platform.findOrCreate({
    where: {
      id: e.id,
      name: e.name
    },
  }));

  // Los traigo desde la db
  platforms = await Platform.findAll();

  res.send(platforms);
});

router.post('/videogames', async(req, res) => {
  
  const {
    name, 
    description,
    released,
    rating,
    background_image,
    genres,
    platforms
  } = req.body;
  
  try {
    if (!name || !description)
      return res.status(400).send('Faltan datos obligatorios.');
  
  
    const newgame = await Videogame.create({
      name,
      description,
      released,
      rating,
      background_image
    });
  
    // Busco los géneros que coincidan con los que me trae por body
    let genresDb = await Genres.findAll({
      where: {name: genres.map(e => e.name)}
    })
  
    // Busco las plataformas que coincidan con los que me trae por body
    let platformsDb = await Platform.findAll({
      where: {name: platforms.map(e => e.name)}
    })
  
    // Creo las relaciones
    newgame.addGenres(genresDb);
    newgame.addPlatforms(platformsDb);
  
    res.status(200).send("El juego ha sido creado exitosamente!");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/videogamesxgen', async(req, res) => {
  const {genero} = req.query;
  
  try {
    let gamesAPI2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    .then(response => 
      response.data.results.map(e => 
      ({
        id: e.id, 
        name: e.name, 
        background_image: e.background_image,
        rating: e.rating,
        genres: e.genres.map(e => {return {name: e.name}}),
        platforms: e.platforms.map(e => {return {name: e.platform.name}})
      })))
    .catch(e => res.status(404).send('Error en la consulta con la API.'));

    let gamesfiltrados = gamesAPI2.filter(e => e.genres.name === 'Shooter ')

    res.status(200).send(gamesfiltrados)    
  } catch (error) {
    res.status(404).send('No se encontraron géneros')
  }
});

module.exports = router;
