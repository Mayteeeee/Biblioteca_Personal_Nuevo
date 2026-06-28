const Prestamo = require('../models/Prestamo');
const Libro = require('../models/Libro');

exports.registrarPrestamo = async (req, res) => {
  try {
    const nuevoPrestamo = new Prestamo(req.body);
    await nuevoPrestamo.save();

    await Libro.findByIdAndUpdate(
      req.body.libroId,
      { estadoPrestamo: 'prestado' },
      { new: true }
    );

    res.status(201).json({
      mensaje: 'Préstamo registrado y libro marcado como prestado',
      nuevoPrestamo
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al registrar el préstamo',
      detalle: error.message
    });
  }
};

exports.obtenerPrestamos = async (req, res) => {
  try {
    const prestamos = await Prestamo.find()
      .populate('libroId')
      .populate('usuarioId');

    res.json(prestamos);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el historial',
      detalle: error.message
    });
  }
};

exports.obtenerPrestamosPorLibro = async (req, res) => {
  try {
    const { id } = req.params;

    const historialLibro = await Prestamo.find({ libroId: id })
      .populate('libroId')
      .populate('usuarioId');

    res.json(historialLibro);
  } catch (error) {
    res.status(500).json({
      error: 'Error al obtener el historial del libro',
      detalle: error.message
    });
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

    await Libro.findByIdAndUpdate(
      prestamoActualizado.libroId,
      { estadoPrestamo: 'devuelto' },
      { new: true }
    );

    res.json({
      mensaje: 'Libro devuelto con éxito',
      prestamoActualizado
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al procesar la devolución',
      detalle: error.message
    });
  }
};

exports.eliminarPrestamo = async (req, res) => {
  try {
    const { id } = req.params;

    const prestamo = await Prestamo.findByIdAndDelete(id);

    if (!prestamo) {
      return res.status(404).json({ error: 'Préstamo no encontrado' });
    }

    res.json({ mensaje: 'Préstamo eliminado del historial' });
  } catch (error) {
    res.status(500).json({
      error: 'Error al eliminar el préstamo',
      detalle: error.message
    });
  }
};