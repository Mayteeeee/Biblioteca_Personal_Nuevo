const Usuario = require('../models/Usuario');

// Función para registrar un usuario nuevo
const registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, password, foto } = req.body;
        const existeCorreo = await Usuario.findOne({ correo });
        if (existeCorreo) {
            return res.status(400).json({ msg: "El correo ya está registrado" });
        }
        const nuevoUsuario = new Usuario({ nombre, correo, password, foto });
        await nuevoUsuario.save();
        res.status(201).json({
            msg: "Usuario registrado con éxito",
            usuario: { id: nuevoUsuario._id, nombre, correo }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor al registrar" });
    }
};

// Función para el Login de usuarios
const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: "El correo o la contraseña son incorrectos" });
        }
        if (usuario.password !== password) {
            return res.status(400).json({ msg: "El correo o la contraseña son incorrectos" });
        }
        res.json({
            msg: "Login exitoso",
            usuario: { id: usuario._id, nombre: usuario.nombre, correo: usuario.correo, foto: usuario.foto }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error en el servidor al iniciar sesión" });
    }
};

// Función para obtener el perfil de un usuario por ID
const obtenerPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await Usuario.findById(id).select('nombre correo foto');
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al obtener el perfil" });
    }
};

// Función para editar el perfil del usuario (nombre, correo, foto)
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
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }
        res.json({ msg: "Perfil actualizado con éxito", usuario: usuarioActualizado });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al actualizar el perfil" });
    }
};

// Función para cambiar la contraseña verificando la anterior
const cambiarPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { passwordAnterior, passwordNuevo } = req.body;

        // 1. Buscar al usuario por ID
        const usuario = await Usuario.findById(id);
        if (!usuario) {
            return res.status(404).json({ msg: "Usuario no encontrado" });
        }

        // 2. Verificar que la contraseña anterior sea correcta
        if (usuario.password !== passwordAnterior) {
            return res.status(400).json({ msg: "La contraseña anterior es incorrecta" });
        }

        // 3. Asignar y guardar la nueva contraseña
        usuario.password = passwordNuevo;
        await usuario.save();

        res.json({ msg: "Contraseña actualizada con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Hubo un error al cambiar la contraseña" });
    }
};

// Exportamos las cinco funciones finales
module.exports = {
    registrarUsuario,
    loginUsuario,
    obtenerPerfil,
    editarPerfil,
    cambiarPassword
};