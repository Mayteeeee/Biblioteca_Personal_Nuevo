const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

router.post('/registro', usuarioController.registrarUsuario);
router.post('/login', usuarioController.loginUsuario);
router.post('/recuperar', usuarioController.enviarCodigoRecuperacion);
router.post('/restablecer', usuarioController.restablecerPassword);
router.put('/password/:id', usuarioController.cambiarPassword);
router.get('/:id', usuarioController.obtenerPerfil);
router.put('/:id', usuarioController.editarPerfil);

module.exports = router;