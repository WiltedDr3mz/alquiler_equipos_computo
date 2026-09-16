const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const errorControl = require('../middlewares/errorControl');

router.post('/register', errorControl((req, res) => authController.registrar(req, res)));
router.post('/login', errorControl((req, res) => authController.login(req, res)));

module.exports = router;
