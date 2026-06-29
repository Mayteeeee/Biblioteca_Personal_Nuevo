const mongoose = require('mongoose');

const PrestamoSchema = new mongoose.Schema({
  libroId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro',
    required: true
  },
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  persona: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  fechaPrestamo: {
    type: Date,
    default: Date.now
  },
  fechaDevolucion: {
    type: Date,
    required: true
  },
  fechaDevueltoReal: {
    type: Date,
    default: null
  },
  notas: {
    type: String,
    default: ''
  },
  devuelto: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Prestamo', PrestamoSchema);