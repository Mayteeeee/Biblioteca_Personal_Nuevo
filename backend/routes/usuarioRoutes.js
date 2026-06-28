const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar un usuario nuevo: POST /usuarios/registro
router.post('/registro', usuarioController.registrarUsuario);

// Ruta para el Login: POST /usuarios/login
router.post('/login', usuarioController.loginUsuario);

// Ruta para obtener perfil por ID: GET /usuarios/:id
router.get('/:id', usuarioController.obtenerPerfil);

// Ruta para editar perfil: PUT /usuarios/:id
router.put('/:id', usuarioController.editarPerfil);

// Ruta para cambiar contraseña: PUT /usuarios/password/:id
router.put('/password/:id', usuarioController.cambiarPassword);

module.exports = router;