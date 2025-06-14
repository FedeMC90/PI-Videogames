require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, 
  DB_PASSWORD, 
  DB_HOST, 
  DB_DEPLOY,
  DATABASE_NAME
} = process.env;

const sequelize = new Sequelize(process.env.DB_DEPLOY, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // Esto es CRUCIAL: le dice a Sequelize que exija SSL
      rejectUnauthorized: false // Importante para Render: Render usa certificados SSL, pero a veces su autoridad de certificación no es reconocida por defecto. Ponerlo en 'false' permite la conexión pero deshabilita la verificación del certificado. En un entorno de producción de alta seguridad, querrías una solución más robusta para la verificación.
    }
  },
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame, Genres, Platform } = sequelize.models;

// Aca vendrian las relaciones
Genres.belongsToMany(Videogame, {through: 'videogame_genres', timestamps: false});
Videogame.belongsToMany(Genres, {through: 'videogame_genres', timestamps: false});

Platform.belongsToMany(Videogame, {through: 'videogame_platform', timestamps: false});
Videogame.belongsToMany(Platform, {through: 'videogame_platform', timestamps: false});

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize     // para importart la conexión { conn } = require('./db.js');
};
