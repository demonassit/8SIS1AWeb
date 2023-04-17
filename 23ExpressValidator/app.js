const express = require('express');

const app = express();

//vamos a crear un objeto que debe de tener dos elementos de acuerdo a la documentacion oficial por parte de validator, en el cuanos nos dice que debemos de tener al cuerpo (body) del documento y al objeto validationResult

const {body, validationResult} = require('express-validator');

app.use(express.json());

//definimos el view
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));

//cuando sea ruta get
app.get('/', (req, res)=>{
    res.render('index');
});

app.post('/registrar', [
    //primero debemos de obtener los elementos para la validacion
    body('nombre', 'Ingresa un nombre y apellido completo').exists().isLength({min:5}),
    body('email', 'Ingrese un email valido').exists().isEmail(),
    body('edad', 'Ingrese una edad valida').exists().isNumeric()
], (req, res)=>{
    //vamos a hacer un manejo de erorres de acuerdo  a la documentacion
    /*const errors = validationResult(req);
    //en el caso de detectar el error generar un arreglo donde se manejen los errores
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }*/

    const errores = validationResult(req);
    if(!errores.isEmpty()){
        console.log(req.body);
        const valores = req.body;
        const validaciones = errores.array();
        res.render('index', {validaciones: validaciones, valores : valores});
    }else{
        res.send('Validacion exitosa');

    }
});

app.listen(3000, ()=>{
    console.log('Servidor inicializado');
})