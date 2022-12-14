const routerMovies = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

routerMovies.use(auth);
routerMovies.post('/movies', celebrate({
  /*  #swagger.parameters['obj'] = {
              in: 'body',
              schema: {
                  $country: 'GER',
                  $director: 'Jhon Doe',
                  $duration: '213',
                  $year: '2001',
                  $description: 'asdad',
                  $image: 'https://www.google.com/',
                  $trailer: 'https://www.google.com/',
                  $thumbnail: 'https://www.google.com/',
                  $movieId: '1231',
                  $nameRU: 'тест',
                  $nameEN: 'test'
              }
      } */
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть ссылкой');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть ссылкой');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле должно быть ссылкой');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

routerMovies.get('/movies', getMovies);
routerMovies.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = routerMovies;
