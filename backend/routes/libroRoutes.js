const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');


router.get('/', libroController.obtenerLibros);                 
router.get('/:id', libroController.obtenerLibroPorId);          
router.post('/', libroController.crearLibro);                   
router.put('/:id', libroController.actualizarLibro);             
router.delete('/:id', libroController.eliminarLibro);          

router.patch('/:id/calificacion', libroController.actualizarCalificacion); 
router.patch('/:id/resena', libroController.actualizarResena);             

module.exports = router;