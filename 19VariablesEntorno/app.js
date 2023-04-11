const express = require('express');

const app = express();

/**
 * con el archivo .env es como node puede detectar cuales son las variables de entorno para este proyecto acorde al sistema
 * 
 * aqui se puede definir los puertos de comunicacion
 * las bases de datos
 * los archivos
 * las rutas del sistema etc
 * 
 * una vez definida podemos hacer la invocacion de dicha variable
 */

//vamos a definir el path de donde se encuentra nuestra variable de entorno
require('dotenv').config({path : './.env'});

const puerto = process.env.PORT || 3000;

app.listen(puerto, ()=>{
    console.log('Servidor inicializado en el puerto ' + puerto);
})