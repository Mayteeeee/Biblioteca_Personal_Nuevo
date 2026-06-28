require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Biblioteca Personal funcionando');
});

app.use('/prestamos', require('./routes/prestamos'));

const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${PUERTO}`);
});