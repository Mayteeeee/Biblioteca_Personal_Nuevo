const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "" // Puede ser URL o Base64
    },
    fechaRegistro: {
        type: Date,
        default: Date.now // Se genera automáticamente la fecha actual
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);