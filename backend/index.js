// modulos internos

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

// modulos creadeos

const usuario = require("./routes/usuario");
const auth = require("./routes/auth")  // traemos nuestro modulo creado 

//const tablero = require("./routes/tablero"); 

//App

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/usuario/",usuario);
app.use("/api/auth/",auth); // ruta de autenticacion 
//app.use("/api/tablero/",tablero);

// puerto de ejecucion

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(" Ejecutando en puerto ", port));

// registro mongo
mongoose
  .connect("mongodb://localhost/hiFiBd", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexion con mongo OK"))
  .catch((error) => console.log("Conexion con mongo OFF"));
