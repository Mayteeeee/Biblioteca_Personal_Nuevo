const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio']
    },
    autor: {
        type: String,
        required: [true, 'El autor es obligatorio']
    },
    categoria: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    },
    paginas: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['leído', 'por leer', 'favorito'],
        default: 'por leer'
    },
    estadoPrestamo: {
        type: String,
        enum: ['disponible', 'prestado', 'devuelto'],
        default: 'disponible'
    },
    calificacion: {
        type: Number,
        min: 1,
        max: 5,
        default: 1
    },
    imagen: {
        type: String, 
        default: ''
    },
    resena: {
        type: String,
        default: ''
    },
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        required: [true, 'El ID del usuario dueño del libro es obligatorio']
    }
    
}, {
    timestamps: true 
});

module.exports = mongoose.model('Libro', libroSchema);