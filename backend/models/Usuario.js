const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true,
        unique: true // Evita que se registren correos repetidos
    },
    password: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        default: "" // Puede iniciar vacío
    },
    fechaRegistro: {
        type: Date,
        default: Date.now // Guarda la fecha del momento exacto del registro
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);