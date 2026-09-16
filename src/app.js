const express = require('express');
const cors = require('cors');

const crearCrudRouter = require('./routes/crud.routes');
const tablasConfig = require('./config/tablas');
const autenticar = require('./middlewares/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Público: registro y login.
app.use('/api/auth', require('./routes/auth.routes'));

// Protegemos el CRUD dinámico completo.
// La tabla usuarios NO se registra aquí: no debe exponerse como CRUD genérico.
app.use('/api/:tabla', (req, res, next) => {
    const tabla = req.params.tabla;
    const idCampo = tablasConfig[tabla];

    if (!idCampo) {
        return res.status(404).json({
            ok: false,
            mensaje: 'Tabla no registrada en la configuración'
        });
    }

    return crearCrudRouter(tabla, idCampo)(req, res, next);
});

app.get('/api/health', (req, res) => {
    res.json({ ok: true, mensaje: 'API funcionando' });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
});

module.exports = app;
