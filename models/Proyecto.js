const mongoose = require('mongoose');

const ProeyctoSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    creado:{
        type: Date,
        default: Date.now()
    },
    creador:{
        //el tipo sera el id del usuario, como si fuera un join
        //la referencia tiene que ser igual al export del modelo del usuario 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    
});

module.exports = mongoose.model('Proyecto', ProeyctoSchema);