const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/conexion_DB');

class AuthController {
    async registrar(req, res) {
        const { nombre, email, password } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Nombre, email y password son obligatorios'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La contraseña debe tener mínimo 6 caracteres'
            });
        }

        const [existentes] = await db.query(
            'SELECT id_usuario FROM usuarios WHERE email = ?',
            [email]
        );

        if (existentes.length > 0) {
            return res.status(409).json({
                ok: false,
                mensaje: 'El email ya está registrado'
            });
        }

        // Nunca guardamos la contraseña original.
        const passwordHash = await bcrypt.hash(password, 10);

        const [resultado] = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, passwordHash]
        );

        return res.status(201).json({
            ok: true,
            mensaje: 'Usuario registrado correctamente',
            data: {
                id_usuario: resultado.insertId,
                nombre,
                email
            }
        });
    }

    async login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Email y password son obligatorios'
            });
        }

        const [usuarios] = await db.query(
            'SELECT id_usuario, nombre, email, password FROM usuarios WHERE email = ?',
            [email]
        );

        if (usuarios.length === 0) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Credenciales inválidas'
            });
        }

        const usuario = usuarios[0];
        const passwordValido = await bcrypt.compare(password, usuario.password);

        if (!passwordValido) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Credenciales inválidas'
            });
        }

        const token = jwt.sign(
            {
                id_usuario: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '2h' }
        );

        return res.json({
            ok: true,
            mensaje: 'Login correcto',
            data: {
                usuario: {
                    id_usuario: usuario.id_usuario,
                    nombre: usuario.nombre,
                    email: usuario.email
                },
                token
            }
        });
    }
}

module.exports = new AuthController();
