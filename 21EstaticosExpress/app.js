const express = require('express');

const app = express();

const path = require('path');

//tenog que setear el motor de la plantilla
app.set('view engine', 'ejs');

app.get('/', (req, res)=>{
    res.render('index');
});

// no se va a ver la imgen ni la css ni los js mientras no se alla definido los recursos por parte de express

app.use(express.static('public'));


//para poder acceder a los recursos demos definir el path
app.use('/recursos', express.static(__dirname + '/public'));
console.log(__dirname);

app.listen(3000, ()=>{
    console.log('Servidor Inicializado');
})