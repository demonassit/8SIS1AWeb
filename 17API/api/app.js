const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

//todo lo que vamos a manipular va a ser por json

const {json} = require('express');

const app = express();

app.use(express.json());

//establecemos nuestro middleware

app.use(cors());

//establecemos nuestra conexion

const conexion = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'n0m3l0',
    database : 'articulos'
});

//establezco la conexion con la bd
conexion.connect(function(error){
    if(error){
        throw error;
        console.log('Error al conectar con la BD');
    }else{
        console.log('Conexion exitosa');
    }
});

//tengo que definir las rutas para visualizar la informacion

app.get('/', function(req, res){
    res.send('Ruta INICIO');
});

//consulta general
app.get('/17API/api/articulos', (req, res) => {
    conexion.query('Select * from articulos', (error, filas)=> {
        if(error){
            throw error;
            console.log("Error al consultar por id");
        }else{
            res.send(filas);
        }
    });
});


//quiero ver todos mis articulos de venta por id
app.get('/17API/api/articulos/:id', (req, res) => {
    //aqui es donde yo hago la consulta a la bd
    conexion.query('Select * from articulos where id = ?', [req.params.id], (error, fila) =>{
        if(error){
            throw error;
            console.log("Error al consultar por id");
        }else{
            res.send(fila);
        }
    });
});

//vamos a crear un nuevo articulo de dulce de venta
app.post('/17API/api/articulos', (req, res) => {
    //vamos a insertar varios datos en la tabla
    let data = {
        descripcion : req.body.descripcion,
        precio : req.body.precio,
        stock : req.body.stock
    };
    //va la sentencia
    let sql = "insert into articulos SET ?";
    conexion.query(sql, data, function(error, result){
        if(error){
            throw error;
            console.log('Error al insertar los datos en articulos');
        }else{
            //primero necesitamos un objeto que le asignemos los parametros para poder insertar y enviarlo como respuesta
            Object.assign(data, {id : result.insertId});
            //esto es necesario para que cada vez que se inserta un nuevo articulo como el id es auto_increment se inserte ese id
            //ya que lo agregamos enviamos los valores
            res.send(data);
        }
    });
});

//para editar
app.put('/17API/api/articulos:id', (req, res) => {
    //primero necesitamos las variables que vamos a editar
    let id = req.params.id;
    let descripcion = req.params.descripcion;
    let precio = req.params.precio;
    let stock = req.params.stock;

    let sql = "Update articulos set descripcion = ?, precio = ?, stock = ?, where id = ?";

    conexion.query(sql, [descripcion, precio, stock, id], function(error, result){
        if(error){
            throw error;
            console.log('Error al actualizar la tabla de articulos');
        }else{
            //simplemente envio los datos
            res.send(result);
        }
    });
});

//eliminar
app.delete('/17API/api/articulos:id', (req, res) => {
    conexion.query('Delete from articulos where id = ?', [req.params.id], function(error, result){
        if(error){
            throw error;
            console.log('Error al borrar el dato');
        }else{
            //envio la respuesta
            res.send(result);
        }
    });
});

//para el servidor
const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function(){
    console.log('Servidor funcionando en el puerto : ' + puerto);
})

