const express = require('express');
const app = express();

const mongoose = require('mongoose');
const moviesRouter = require('./routes/movies');

app.use(express.json());
app.use('/movies', moviesRouter);

const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

module.exports = app;


mongoose.connect('mongodb://localhost:27017/movie-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`Error connecting to MongoDB: ${err}`);
});

app.listen(port, ()=>{
    console.log(`Server runnning on port: ${port}`)
  })