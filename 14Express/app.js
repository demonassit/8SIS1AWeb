//mandamos a llamar a la libreria

var express = require('express');

//hacemos una referencia al constructor de objetos de express para que este tenga acceso a los metodos propios de la libreria

var app = express();

//una vez que tenemos el servidor inicializado debemos de manejar rutas para atender las peticiones mediante los metodos
// get, post, put, delete, patch, etc
app.get('/', function(req, res){
    //es que envie un mensaje de texto
    res.send('Ruta INICIO');
});


//creamos un objeto para el servidor mediante el uso de express
app.listen(3000, function(req, res){
    console.log('Servidor inicializado en el puerto 3000');
});