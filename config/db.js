const mongoose = require('mongoose');

require('dotenv').config({path:'variables.env'});

const conectarDB = async () =>{

    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useUnifiedTopology: true,
            useFindAndModify:false
        });
        console.log('DB conectada correctamente');
    }catch( error ){
        console.log( error );
        process.exit(1);//detiene la app si hay algun error
    }
}

module.exports = conectarDB;