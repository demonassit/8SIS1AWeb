const express = require('express');
const app = express();

//vamos a utilizar el modulo de bcryptjs

const bcryptjs = require('bcryptjs');

//tenemos que cifrar el canal de comunicacion

app.use(express.urlencoded({extended : false}));

app.use(express.json());

//vamos a realizar una prueba unitaria para el acceso a la app para despues implementarlo en bd cifrada con un hash
//simulemos un login por metodo post
//y lo vamos a hacer primero de forma asincrona que es como se debe de programar el cifrado
//asincrono
/*
app.post('/login', async (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;

    //todo esto lo vamos a probar en postman para ingresar los datos y verificar si entra
    if(user == 'admin' && password == '12345'){
        //si es correcto debemos de recordar que en la bd debe de estar cifrados los datos sensibles, para ello vamos a usar un hash para cifrar datos
        let passwordHash = await bcryptjs.hash(password, 8);

        res.json({
            message : 'Autenticacion exitosa',
            passwordHash : passwordHash
        });
    }else{
        res.json({
            message : 'Credenciales incorrectas'
        });
    }
});
*/
//sincrono
app.post('/login', (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;

    //todo esto lo vamos a probar en postman para ingresar los datos y verificar si entra
    if(user == 'admin' && password == '12345'){
        //si es correcto debemos de recordar que en la bd debe de estar cifrados los datos sensibles, para ello vamos a usar un hash para cifrar datos
        let saltos = bcryptjs.genSalt(8);
        let hash = bcryptjs.hashSync(password, saltos);

        res.json({
            message : 'Autenticacion exitosa',
            passwordHash : passwordHash
        });
    }else{
        res.json({
            message : 'Credenciales incorrectas'
        });
    }
});


//vamos a crear la ruta para compararlo y si es correcto entre
app.get('/comparar', (req, res)=>{
    //primero definimos nuestro hash
    let hashSaved = '$2a$08$dvo2/KLGq9kJLyjozufP/.0Ung//m50W5tOvzST4D.wgwRy1jBFUG';

    //debo de compara que la contraseña sea correcta respecto del hash

    let compare = bcryptjs.compareSync('12345', hashSaved);

    if(compare){
        res.json('OK wiiii');
    }else{
        res.json('No son iguales solo juguito contigo');
    }
});

app.listen(3000, ()=>{
    console.log('Servidor inicializado');
})