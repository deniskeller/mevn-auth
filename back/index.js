require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
const { routes } = require('./src/routes');
const cors = require('cors');

//подключение к бд
mongoose.connect(
  process.env.MONGO_URL, 
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

routes.forEach(item => {
  // console.log('item: ', item);
  app.use(`/api/amigoweb/${item}`, require(`./src/routes/${item}`));
})

const PORT = process.env.PORT || 4000;
http.createServer({}, app).listen(PORT);
console.log(`сервер запущен на хосте: ${PORT}`);

