require('dotenv').config();

const express = require('express');
const cors = require('cors');
const conectarDB = require('./config/database');

const app = express();

conectarDB();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/usuarios', require('./routes/usuarioRoutes'));
app.use('/libros', require('./routes/libroRoutes'));
app.use('/prestamos', require('./routes/prestamos'));

app.get('/', (req, res) => {
    res.send('API Biblioteca Personal funcionando');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});