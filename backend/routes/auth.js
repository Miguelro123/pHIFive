const express = require("express");
const router = express.Router();

// modulos internos 

const { Usuario } = require("../model/usuario");

//Ruta

router.post("/", async ( req, res) => {

     //validamos que exista el correo 
      const usuario = await Usuario.findOne({ correo: req.body.correo});

      // si no existe el correo 
      if(!usuario) return res.status(400).send("correo o contrasena no son validos");
      //si el password no existe 
      if(usuario.password !== req.body.password) return res.status(400).send("correo o contrasena no son validos");
    // Generar el JWT
    const jwtToken = usuario.generateJWT();
    //console.log ("... autenticacion ", usuario)   {jwtToken}
    res.status(200).send({
        usu_log: usuario.nombre + " " + usuario.apellido,
        jwtToken: jwtToken
      });

})

// Exports
module.exports = router;