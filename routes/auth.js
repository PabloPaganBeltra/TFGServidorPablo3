//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../contollers/authController');
const auth = require('../middelware/auth');

//Iniciar sesion
//api/auth
router.post('/',
    authController.autenticarUsuario
);

//obtiene el usuario autenticado
router.get('/',
    auth,
    authController.usuarioAutenticado
);

module.exports = router;
