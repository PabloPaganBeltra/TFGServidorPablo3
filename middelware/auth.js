const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    app.use(function (req, res, next) {

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');
    
        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    
        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
    
        // Pass to next layer of middleware
        next();
    });
    //leer el token dle header
    const token = req.header('x-auth-token');

    //console.log(token);

    //revisar si no hya token
    if(!token){
        return res.status(401).json({msg : 'No hay token permiso no valido'});
    }

    //validar el token
    try{
        const cifrado = jwt.verify(token, process.env.SECRETA);
        req.usuario = cifrado.usuario;
        next();
    }catch(error){
        console.log(error);
        res.status(401).json({msg: 'Token no valido'})
    }
}