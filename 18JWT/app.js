const express = require('express');

const app = express();

//definimos al jwt

const jwt = require('jsonwebtoken');

//definimos las llaves

const keys = require('./settings/keys');

//hacemos una llamada para enviar la referencia de las llaves

app.set('key', keys.key);

//especificamos el tipo de codificacion para la llave

app.use(express.urlencoded({extended : false}));

//vamos a decir que todo va a ser en formato json

app.use(express.json());

//vamos a generar una ruta
app.get('/', (req, res) =>{
    res.send('Hola Mundo con JWT');
})

app.listen(3000, () =>{
    console.log('Servidor inicializado en el puerto 3000');
})


//ruta del login
app.post('/login', (req, res) =>{
    //ahorita no vamos a hacer aun uso de la bd solo vamos a verificar mediante postman que se pueda enviar y devolver el token
    //preguntar si los datos del login son correctos
    if(req.body.usuario == "admin" && req.body.pass == '12345'){
        //este es nuestro payload mediante el cual nosotros definimos cuales son los parametros del usuario para autenticarlo
        const payload = {
            check : true
        };
        //cargamos el token y definimos el tiempo para que expire la sesion
        const token = jwt.sign(payload, app.get('key'), {
            //aqui definimos la sesion
            expiresIn: '7d'
        });
        //necesito verificar que si entro
        res.json({
            message : 'Autenticacion Exitosa',
            token : token
        })
    }else{
        //en caso de que sean incorrectos
        res.json({
            message : 'User and Pass no correct peto'
        })

    }
})
/**
 * necesitamos un intermediario porque necesitamos saber el tipo de autorizacion (rol)
 */

const verificacion = express.Router();

verificacion.use((req, res, next) =>{
    //tenemos que hacer una verificacion de acceso y su tipo de autorizacion
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    //console.log(token);

    if(!token){
        res.status(401).send({
            error : 'Es necesario un token para su autenticacion'
        });
    }

    if(token.startsWith('Bearer ')){
        //tenemos que quitarlo de la cadena
        token = token.slice(7, token.length);
        console.log(token);
    }

    if(token){
        jwt.verify(token, app.get('key'), (error, decoded) =>{
            if(error){
                return res.json({
                    message : 'El token no es valido'
                });
            }else{
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    }

})


app.get('/info', verificacion, (req, res)=>{
    //cuando lo hagamos verificaremos que nos dice el token
    res.json('Informacion entregada');
})
