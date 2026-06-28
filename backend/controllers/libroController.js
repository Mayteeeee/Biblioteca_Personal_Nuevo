const Libro = require('../models/Libro');


exports.obtenerLibros = async (req, res) => {
    try {
        const libros = await Libro.find();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al obtener los libros', error });
    }
};


exports.obtenerLibroPorId = async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al buscar el libro', error });
    }
};


exports.crearLibro = async (req, res) => {
    try {
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.status(201).json({ message: 'Libro agregado con éxito', nuevoLibro });
    } catch (error) {
        res.status(400).json({ message: 'Error al agregar el libro', error });
    }
};


exports.actualizarLibro = async (req, res) => {
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        if (!libroActualizado) {
            return res.status(404).json({ message: 'Libro no encontrado para actualizar' });
        }
        res.json({ message: 'Libro actualizado con éxito', libroActualizado });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar el libro', error });
    }
};


exports.eliminarLibro = async (req, res) => {
    try {
        const libroEliminado = await Libro.findByIdAndDelete(req.params.id);
        if (!libroEliminado) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro', error });
    }
};


exports.actualizarCalificacion = async (req, res) => {
    try {
        const { calificacion } = req.body;
        const libro = await Libro.findByIdAndUpdate(
            req.params.id,
            { calificacion },
            { new: true, runValidators: true }
        );
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json({ message: 'Calificación actualizada', libro });
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la calificación', error });
    }
};


exports.actualizarResena = async (req, res) => {
    try {
        const { resena } = req.body;
        const libro = await Libro.findByIdAndUpdate(
            req.params.id,
            { resena },
            { new: true }
        );
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }
        res.json({ message: 'Reseña guardada con éxito', libro });
    } catch (error) {
        res.status(400).json({ message: 'Error al guardar la reseña', error });
    }
};