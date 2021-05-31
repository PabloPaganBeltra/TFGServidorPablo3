const { request } = require('express');
const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');
const corsOpts = {
    origin: '*',
  
    methods: [
      'GET',
      'POST',
    ],
  
    allowedHeaders: [
      'Content-Type',
    ],
  };

//Creando el servidor
const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Conectar a la base de datos
conectarDB();

//habilitar cors
// app.use(cors());
app.use(cors(corsOpts));

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

