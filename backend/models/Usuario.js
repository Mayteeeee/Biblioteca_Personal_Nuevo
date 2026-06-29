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
        default: "" 
    },
    fechaRegistro: {
        type: Date,
        default: Date.now 
    }
});

module.exports = mongoose.model('Usuario', usuarioSchema);