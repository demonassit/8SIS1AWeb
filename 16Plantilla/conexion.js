var mysql = require('mysql');

var conexion = mysql.createConnection({
    //debo establecer los parametros de dicha conexion los cuales son el host, database, user, pass
    host : 'localhost', //ip 
    database : 'alumnos8sis1a', 
    user : 'root',
    password : 'n0m3l0'
});

//ejecutar la conexion

conexion.connect(function(error){
    //si es que no conecta
    if(error){
        throw error;
        console.log('Error al conectar la BD');
    }else{
        console.log('Conexion exitosa');
    }
});


//una consulta para saber que datos existen

conexion.query('select * from alumnos', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error al consultar la tabla');
    }

    respuesta.forEach(respuesta => {
        console.log(respuesta);
    });
});


//vamos a realizar un registro

conexion.query('insert into alumnos (nombre, appat, apmat, correo, password) values ("Diana", "Del Monte", "Gutierrez", "diana@hotmail.com", "123456")', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error al insertar la tabla');
    }

    console.log('Registro exitoso', respuesta);
});

//vamos a actualizar un registro

conexion.query('update alumnos set nombre = "Chillo por unas comillas" where id = 2', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error al actualizar en la tabla');
    }

    console.log('Registro actualizado', respuesta);
});


//vamos a borrar un registro

conexion.query('delete from alumnos where id = 3', function(error, respuesta){
    if(error){
        throw error;
        console.log('Error al eliminar en la tabla');
    }

    console.log('Registro borrado', respuesta);
});