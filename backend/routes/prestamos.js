const express = require('express');
const router = express.Router();
const prestamoController = require('../controllers/prestamoController');

router.post('/', prestamoController.registrarPrestamo);
router.get('/', prestamoController.obtenerPrestamos);
router.get('/libro/:id', prestamoController.obtenerPrestamosPorLibro);
router.put('/:id', prestamoController.marcarDevolucion);
router.delete('/:id', prestamoController.eliminarPrestamo);

module.exports = router;