const express = require("express");
const conectarDB = require("./config/db");
const cors = require("cors");

//  Crear el servidor
const app = express();

//  Conectamos a la base de datos
conectarDB();

//  Habilitamos cors
app.use(cors());

//  Habilitar express.json para poder hacer res.json
app.use(express.json({ extended: true }));

//  Habla algo de "erocu", se supone que revisa si tenemos un puerto configurado, si no, utilizará el 4000
const PORT = process.env.PORT || 4000;

//  Importamos rutas de los usuarios para que express las pueda manejar
app.use("/api/usuarios", require("./routes/usuarioRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/boards", require("./routes/boardRoutes"));
// app.use("/api/queues", require("./routes/queueRoutes"));
// app.use("/api/boards/:board/queues", require("./routes/queueRoutes"));

//  Arrancamos el servidor
app.listen(PORT, () => {
  console.log(`El servidor está funcionando en el puerto ${PORT}`);
});
