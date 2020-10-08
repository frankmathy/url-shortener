const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const yup = require('yup');
const { nanoid } = require('nanoid');

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

const schema = yup.object().shape({
  slug: yup
    .string()
    .trim()
    .matches(/^[\x21-\x7E]+$/i),
  url: yup
    .string()
    .trim()
    .url()
    .required()
});

app.post('/url', (req, res, next) => {
  let { slug, url } = req.body;
  schema
    .isValid({
      slug,
      url
    })
    .then(valid => {
      console.log(`Schema valid = ${valid}`);
      if (valid) {
        if (!slug) {
          slug = nanoid(5);
        }
        slug = slug.toLowerCase();
        res.json({
          slug,
          url
        });
      } else {
        console.log('Error');
        next({ message: 'Incorrect slug format' });
      }
    });
});

app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === 'production' ? 'no stack available' : error.stack
  });
});

const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
