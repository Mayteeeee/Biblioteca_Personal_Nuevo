const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro'); 

exports.registrarPrestamo = async (req, res) => {
  try {
    const nuevoPrestamo = new Prestamo(req.body);
    await nuevoPrestamo.save();

    await Libro.findByIdAndUpdate(req.body.libroId, { estado: 'prestado' });

    res.status(201).json({ mensaje: 'Préstamo registrado y libro actualizado', nuevoPrestamo });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el préstamo' });
  }
};

exports.obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find().populate('libroId').populate('usuarioId');
    res.json(prestamos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

exports.obtenerPrestamosPorLibro = async (req, res) => {
  try {
    const { id } = req.params;
    const historialLibro = await Prestamo.find({ libroId: id }).populate('usuarioId');
    res.json(historialLibro);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el historial del libro' });
  }
};

exports.marcarDevolucion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const prestamoActualizado = await Prestamo.findByIdAndUpdate(
      id, 
      { devuelto: true }, 
      { new: true }
    );

    if (!prestamoActualizado) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    await Libro.findByIdAndUpdate(prestamoActualizado.libroId, { estado: 'disponible' });

    res.json({ mensaje: 'Libro devuelto con éxito', prestamoActualizado });
  } catch (error) {
    res.status(500).json({ error: 'Error al procesar la devolución' });
  }
};

exports.eliminarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await Prestamo.findByIdAndDelete(id);
    if (!prestamo) return res.status(404).json({ error: 'Préstamo no encontrado' });
    
    res.json({ mensaje: 'Préstamo eliminado del historial' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el préstamo' });
  }
};