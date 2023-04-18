const express = require('express');

const app = express();

const Sequelize = require('sequelize');

//lo primero que hacer es definir los parametros para la instancia por parte de nuestro ORM

const sequelize = new Sequelize('secualize', 'root', 'n0m3l0', {
    host : 'localhost',
    dialect : 'mysql'
});

//tenemos que definir los elementos del modelo de la bd
const model = sequelize.define('usuarios', {
    "id" : {type: Sequelize.INTEGER, primaryKey:true},
    "nombre" : Sequelize.STRING,
    "password" : Sequelize.STRING,
});

//establecer la conexion con la bd
sequelize.authenticate().then(()=>{
    console.log('Conexion exitosa con la bd');
}).catch( error => {
    console.log('Error no se puede conectar a la bd' + error);
} );

//vamos a realizar una busqueda de todos los resultados

model.findAll({
    attributes : ['nombre', 'password']
}).then( resultado => {
    const resultados = JSON.stringify(resultado);
    console.log(resultados);
} ).catch( error =>{
    console.log('Error al consultar los datos' + error);
});

app.listen(3000, ()=>{
    console.log('Servidor inicializado');
})