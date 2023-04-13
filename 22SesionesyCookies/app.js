const express = require('express');

const session = require('express-session');

const app = express();

//la tipica sesion sin bd
/*
app.use(session({
    // una clave para dicha sesion (podemos ocupar el token)
    secret : '12345',
    //la forma de almacenamiento de la sesion
    resave : true,
    //tiene que ver como tanto el cliente como el servidor van a inicializar la sesion
    saveUninitialized : true
}));

//vamos a emular una sesion verdadera a partir de login
app.get('/', (req, res)=>{
    req.session.usuario = 'Juanito';
    req.session.rol = 'admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

    console.log(req.session);
    res.send(`
        El usuario <strong> ${req.session.usuario} </strong> con el rol <strong> ${req.session.rol} </strong> ha entrado <strong> ${req.session.visitas} </strong> veces
     `)
});
*/

//con bd

const mysqlstore = require('express-mysql-session')(session);

const opciones = {
    host : 'localhost',
    port : '3306',
    user : 'root',
    password : 'n0m3l0',
    database : 'prueba_sesion'
};


//vamos a crear un modulo para contener todo
const sesionStorage = new mysqlstore(opciones);

//defino los elemento sde la sesion
app.use(session({
    //una vez definimos primero la clave
    key : 'cookie_usuario',
    secret : '12345',
    store : sesionStorage,
    resave : false,
    saveUninitialized : false
}));

app.get('/', (req, res)=>{
    req.session.usuario = 'Juanito';
    req.session.rol = 'admin';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

    console.log(req.session);
    res.send(`
        El usuario <strong> ${req.session.usuario} </strong> con el rol <strong> ${req.session.rol} </strong> ha entrado <strong> ${req.session.visitas} </strong> veces
     `)
});

app.listen(3000, ()=>{
    console.log('Servidor inicializado');
});