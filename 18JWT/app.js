//lo primero que hacemos es npm install express jsonwebtoken
//segundo creamos el archivo app.js
//creamos la carpeta settings
//adentro de settings creamos un archivo llamado keys.js y ahi se van a guardar las claves

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

const keys = require('./settings/keys');
//hacemos una llamada para enviar  la referencia de las llaves
app.set('key', keys.key);

//especificamos para el tipo de codificacion
app.use(express.urlencoded({extended:false}));

app.use(express.json());

//tenemos una ruta

app.get('/', (req, res)=>{
    res.send('Hola mundo'); 
})

app.listen(3000, () =>{
    console.log('Servidor inicializado en el puerto 3000');
})

//ruta para un login

app.post('/login', (req, res)=>{
    //ahorita no estamos haciendo uso de  una bd por ello debemos mandar los datos
    if(req.body.usuario == 'admin' && req.body.pass == '12345'){
        //payload es parte del jwt que nos sirve para saber si es correcto el usuario
        const payload = {
            check:true
        };
        //cargamos el token y expresamos el tiempo
        const token = jwt.sign(payload, app.get('key'), {
            expiresIn:'7d'
        });
        //ahora si todo es correcto enviamos un mensaje
        res.json({
            message : 'Autenticación Exitosa',
            token : token
        });

    }else{
        //en caso de que no sean correctos
        res.json({
            message : 'User y Pass incorrectos',
            
        });
    }
});

/*
en postman debemos de dar clic en nueva peticion
metemos los elemento sdel servidor y la ruta
definimos post y get para el envio de la informacion
body seleccionamos raw y formato json 
{
    "usuario":"admin",
    "pass" : "123456"
}
*/ 

//ahora necesitamos crear un middlewere para protegernos de los diferentes tipos de ataques

const verificacion = express.Router();

verificacion.use((req, res, next)=>{
    //tenemos que hacer una verificacion de acceso y autorizacion
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //comentamos esta seccion
    //console.log(token);
    //y ahora debemos de saber si viene de la ruta y los elementos de autenticacion
    if(!token){
        res.status(401).send({
            error : 'Es necesario un token para su atenticacion' 
        });
        return         
    }
    if(token.startsWith('Bearer ')){
        //en este caso vamos a quitarlos de la cadena
        token = token.slice(7, token.length);
        console.log(token);
    }
    //vamos a verificar si el token es valido
    if(token){
        jwt.verify(token, app.get('key'), (error, decoded)=>{
            if(error){
                return res.json({
                    message : 'El token no es valido'
                });
            }else{
                req.decoded = decoded;
                next();
            }
        })
    }
});
/*
en postman debemos de meter en el type : bearer token y debemos de copiar el token que nos devolvio en la peticion
para que haga la prueba de la ruta y se vea en la consola la informacion
*/
app.get('/info', verificacion, (req, res)=>{
    
    //cuando lo gamos erificaremos que dice Bearer y para eso debemos de quitarla 
    
    res.json('Informacion entregada');
    
});

