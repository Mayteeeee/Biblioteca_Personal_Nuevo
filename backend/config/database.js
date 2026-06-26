const mongoose = require('mongoose');

const conectarDB = async () => {
  try {
    console.log('Intentando conectar a MongoDB...');

    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000
    });

    console.log('MongoDB conectado correctamente');
  } catch (error) {
    console.error('Error al conectar MongoDB:', error.message);
  }
};

module.exports = conectarDB;