const express = require('express');
const router = express.Router();
const proyectoController = require('../contollers/proyectoController');
const auth = require('../middelware/auth');
const { check } = require('express-validator');


//Crea proyectos
// api/proyectos
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del mensaje es obligatorio').not().isEmpty()
    ],
    proyectoController.crearProyecto
);

//Obtener todos los proyectos
router.get('/',
    auth,
    proyectoController.obtenerProyectos
);

//Actualizar proyectos via Id
router.put('/:id', 
    auth,
    [
        check('nombre', 'El nombre del mensaje es obligatorio').not().isEmpty()
    ],
    proyectoController.actualizarProyecto
);

//Eliminar un Proyecto
router.delete('/:id', 
    auth,
    proyectoController.eliminarProyecto
);

module.exports = router;