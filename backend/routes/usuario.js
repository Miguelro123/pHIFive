const express = require("express");
const router = express.Router();

//invocamos modulos creados

const {Usuario} = require("../model/usuario");

// ruta

router.post("/", async(req,res) => {

    // revisamos si existe el usuario

    let usuario = await Usuario.findOne({ correo: req.body.correo });
    //si el usuaario existe en BD
    if(usuario) return res.status(400).send("El usuario ya existe en la BD");
    // si el correo no existe 
    usuario = new Usuario({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        idEstado: req.body.idEstado,
        direccion: req.body.direccion,
        correo: req.body.correo,
        password: req.body.password,
    });

    //  guardamos el usuario se genera el JWT

    const result = await usuario.save();
    const jwtToken = usuario.generateJWT();
    res.status(200).send({ jwtToken})

});

// exports
module.exports = router;
