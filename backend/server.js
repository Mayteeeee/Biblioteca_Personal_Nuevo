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

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});