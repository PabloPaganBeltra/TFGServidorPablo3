const Tarea = require('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');

//Crea una nueva tarea
exports.creaTarea = async (req, res) =>{
    //revisamos si hay errores
    const errores = validationResult(req);
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    try {
        //Extraer proyecto para comprobar que exista
        const { proyecto } = req.body;
        
        const existeProyecto = await Proyecto.findById(proyecto);
        if(!existeProyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'});
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Crear la tarea
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

//obtiene las tareas por proyecto
exports.obtenerTareas = async ( req, res) =>{

    try {

        //Extraer proyecto para comprobar que exista
        const { proyecto } = req.query;
        const existeProyecto = await Proyecto.findById(proyecto);

        if(!existeProyecto){
            return res.status(404).json({msg : 'Proyecto no encontrado'});
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Obtener las tareas por proyecto | como where en mongo
        const tareas = await Tarea.find({ proyecto }).sort({creado: -1 });
        res.json({ tareas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');
    }
}

//Actualizar tareas
exports.actualizarTarea = async ( req, res ) =>{

    try {

        //Extraer proyecto para comprobar que exista
        const { proyecto, nombre, estado } = req.body;
        const existeProyecto = await Proyecto.findById(proyecto);

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No Existe esa tarea'});
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //crear un objeto con la informacion
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        //Guardar Tarea
        tarea = await Tarea.findOneAndUpdate({ _id: req.params.id}, nuevaTarea, {new : true});

        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');  
    }

}

//Eliminar una tarea
exports.eliminarTarea = async ( req, res ) =>{

    try {

        //Extraer proyecto para comprobar que exista
        const { proyecto } = req.query;
        //extreaer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        //si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);
        if(!tarea){
            return res.status(404).json({msg: 'No Existe esa tarea'});
        }

        //revisar si el proyecto pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: 'No Autorizado'});
        }

        //Eliminar 
        await Tarea.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error.');  
    }
}