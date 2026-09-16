const express = require('express');
const errorControl = require('../middlewares/errorControl');
const CrudController = require('../controllers/crud.controller');

function crearCrudRouter(tabla, idCampo) {
    const router = express.Router();
    const crud = new CrudController(tabla, idCampo);

    router.get('/', errorControl(async (req, res) => {
        res.json(await crud.obtenerTodos());
    }));

    router.get('/:id', errorControl(async (req, res) => {
        res.json(await crud.obtenerUno(req.params.id));
    }));

    router.post('/', errorControl(async (req, res) => {
        res.status(201).json(await crud.crear(req.body));
    }));

    router.put('/:id', errorControl(async (req, res) => {
        res.json(await crud.actualizar(req.params.id, req.body));
    }));

    router.delete('/:id', errorControl(async (req, res) => {
        res.json(await crud.eliminar(req.params.id));
    }));

    return router;
}

module.exports = crearCrudRouter;
