const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Movie = require('../models/movie');
const authMiddleware = require('../middlewares/auth');
const validateMiddleware = require('../middlewares/validate');

const movieSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    releaseYear: Joi.number().required(),
  });

  router.post('/', authMiddleware, validateMiddleware(movieSchema), async (req, res) => {
    const { error } = movieSchema.validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }
  
    const { title, director, releaseYear } = req.body;
  
    try {
      const movie = new Movie({ title, director, releaseYear });
      await movie.save();
      res.send(movie);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Server error' });
    }
  });

  module.exports = router;