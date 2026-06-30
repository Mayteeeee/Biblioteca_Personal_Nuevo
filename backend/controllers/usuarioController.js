const Usuario = require('../models/Usuario');
const nodemailer = require('nodemailer');

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, password, foto } = req.body;

    const existeCorreo = await Usuario.findOne({ correo });

    if (existeCorreo) {
      return res.status(400).json({ msg: 'El correo ya está registrado' });
    }

    const nuevoUsuario = new Usuario({ nombre, correo, password, foto });
    await nuevoUsuario.save();

    res.status(201).json({
      msg: 'Usuario registrado con éxito',
      usuario: { id: nuevoUsuario._id, nombre, correo }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error en el servidor al registrar' });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { correo, password } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(400).json({ msg: 'El correo o la contraseña son incorrectos' });
    }

    if (usuario.password !== password) {
      return res.status(400).json({ msg: 'El correo o la contraseña son incorrectos' });
    }

    res.json({
      msg: 'Login exitoso',
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        foto: usuario.foto
      }
    });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error en el servidor al iniciar sesión' });
  }
};

const obtenerPerfil = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id).select('nombre correo foto');

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al obtener el perfil' });
  }
};

const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, correo, foto } = req.body;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      id,
      { nombre, correo, foto },
      { new: true }
    ).select('nombre correo foto');

    if (!usuarioActualizado) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({
      msg: 'Perfil actualizado con éxito',
      usuario: usuarioActualizado
    });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al actualizar el perfil' });
  }
};

const cambiarPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { passwordAnterior, passwordNuevo } = req.body;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (usuario.password !== passwordAnterior) {
      return res.status(400).json({ msg: 'La contraseña anterior es incorrecta' });
    }

    usuario.password = passwordNuevo;
    await usuario.save();

    res.json({ msg: 'Contraseña actualizada con éxito' });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al cambiar la contraseña' });
  }
};

const enviarCodigoRecuperacion = async (req, res) => {
  try {
    const { correo } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ msg: 'No existe una cuenta con ese correo' });
    }

    const codigo = Math.floor(100000 + Math.random() * 900000).toString();

    usuario.codigoRecuperacion = codigo;
    usuario.codigoExpira = new Date(Date.now() + 10 * 60 * 1000);
    await usuario.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: `"Biblioteca Personal" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: 'Código para recuperar tu contraseña',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Tu código de verificación es:</p>
        <h1>${codigo}</h1>
        <p>Este código vence en 10 minutos.</p>
      `
    });

    res.json({ msg: 'Código enviado al correo' });
  } catch (error) {
    res.status(500).json({
      msg: 'No fue posible enviar el correo',
      error: error.message
    });
  }
};

const restablecerPassword = async (req, res) => {
  try {
    const { correo, codigo, passwordNuevo } = req.body;

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    if (!usuario.codigoRecuperacion || !usuario.codigoExpira) {
      return res.status(400).json({ msg: 'No hay código activo' });
    }

    if (usuario.codigoRecuperacion !== codigo) {
      return res.status(400).json({ msg: 'Código incorrecto' });
    }

    if (usuario.codigoExpira < new Date()) {
      return res.status(400).json({ msg: 'El código expiró' });
    }

    usuario.password = passwordNuevo;
    usuario.codigoRecuperacion = '';
    usuario.codigoExpira = null;
    await usuario.save();

    res.json({ msg: 'Contraseña restablecida correctamente' });
  } catch (error) {
    res.status(500).json({ msg: 'Hubo un error al restablecer la contraseña' });
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  obtenerPerfil,
  editarPerfil,
  cambiarPassword,
  enviarCodigoRecuperacion,
  restablecerPassword
};