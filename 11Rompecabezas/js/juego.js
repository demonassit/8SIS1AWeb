//vamos a crear un arreglo que contenga las instrucciones para el juego

var instrucciones = ["Utilizar las flehcas para mover las piezas", "Ordenar las pierzas hasta alcanzar la imagen objetivo"];

//vamos a crear una variable para guardar los movimientos

var movimientos = [];

//vamos a crear una matriz que represente las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecto = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//necesito una variable para guardar la posicion de la pieza vacia
var filaVacia = 2;
var columnaVacia = 2;

//necesito una funcion para recorrer el arreglo pasando por cada elemento 

function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesEnlista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesEnlista(instruccion, idLista){
    //del html
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a hacer una funcion para agregar la ultima direccion del movimiento
function agregarUltimoMovimiento(direccion){
    movimientos.push(direccion);
}

//una funcion para checar si gane
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){
        for(var j = 0; j < rompe[i].length; j++){
            //que i = ij
            var rompeActual = rompe[i][j];
            if(rompeActual != rompeCorrecto[i][j]){
                return false;
            }
        }
    }
    return true;
}

//funcion para decir que gane
function mostrarCartelGanador(){
    if(checarSiGano()){
        alert("Wiiiii a mimir");
    }
    return false;
}

//funcion para intercambiar las dos posiciones de la pieza 
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

//intercambiar los valores por las posciiones

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columaPos2];

    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//tenemos que checar si la posicion dentro del rompecabezas es la correcta
function posicionValida(fila, columna){
    return(fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//ahora viene la parte del movimiento de las piezas derivado a que el hueco es el que se mueve a intercambia posicion con cada una es por ello que debemos saber representar el movimiento de las teclas
//arriba (38), abajo (40), izquierda (37), derecha(39)

function moverEnDireccion(direccion){
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    //si se mueve hacia abajo
    if(direccion === codigosDireccion.ABAJO){
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    //si se mueve hacia arriba
    else if(direccion === codigosDireccion.ARRIBA){
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }

    else if(direccion === codigosDireccion.DERECHA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    }

    else if(direccion === codigosDireccion.IZQUIERDA){
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    //checar si la nueva posicion es valida y sino intercambiarla

    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);

        //agregar el ultimo movimiento
        agregarUltimoMovimiento(direccion);
    }


}

var codigosDireccion= {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO: 40
};

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
    
}



