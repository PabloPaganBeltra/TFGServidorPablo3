const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Creando el servidor
const app = express();

//Conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://lucid-haibt-83aa0b.netlify.app/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

//habilitar express.json
app.use( express.json({extended:true}) );

//Puerto de la app
const port = process.env.PORT || 4000;

//Definir pagina principal
app.get('/', (req, res)=>{
    res.send('hola mundo')
});

//importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Arrancar server
app.listen(port, '0.0.0.0', ()=>{
    console.log('El servidor esta funcionando en el puerto',port);
});

