const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const encabezado = req.headers.authorization;

    if (!encabezado || !encabezado.startsWith('Bearer ')) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token de acceso requerido'
        });
    }

    const token = encabezado.split(' ')[1];

    try {
        req.usuario = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token inválido o expirado'
        });
    }
}

module.exports = autenticar;
