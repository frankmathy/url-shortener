const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.json({
    message: 'cdg.sh - Short Urls for your code garden'
  });
});

app.get('/url/:id', (req, res) => {
  //TODO get a short URL by ID
});

app.get('/:id', (req, res) => {
  //TODO redirect to URL
});

app.post('/url', (req, res) => {
  // create a short url
});

const port = process.envPORT || 1337;
app.listen(port, () => {
  console.log(`Lisening at http://localhost:${port}`);
});
