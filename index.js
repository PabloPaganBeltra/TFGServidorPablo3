const { req } = require('express');
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//Creando el servidor
const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();

    next();
});

//Conectar a la base de datos
conectarDB();

//habilitar cors
app.use(cors());

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

