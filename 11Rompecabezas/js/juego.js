//vamos a crear un arreglo que contenga las instrucciones para el juego

var instrucciones = ["Utilizar las flechas para mover las piezas",
    "Ordenar las piezas hasta alcanzar la imagen objetivo"
];

//vamos a crear una variable para guardar los movimientos

var movimientos = [];

//vamos a crear una matriz que represente las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//necesito una variable para guardar la posicion de la pieza vacia
var filaVacia = 2;
var columnaVacia = 2;

//necesito una funcion para recorrer el arreglo pasando por cada elemento 

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionEnLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionEnLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

//vamos a hacer una funcion para agregar la ultima direccion del movimiento
function agregarUltimoMovimiento(direccion) {
    movimientos.push(direccion);
}

//una funcion para checar si gane
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var rompeActual = rompe[i][j];
            if (rompeActual !== rompeCorrecta[i][j]) {
                return false;
            }
        }
    }

    return true;
}

//funcion para decir que gane
function mostrarCartelGanador() {
    if (chequearSiGano()) {
        alert("Wiiii mimir");
    }
    return false;

}

//funcion para intercambiar las dos posiciones de la pieza 
/*arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];*/

//intercambiar los valores por las posciiones

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {

    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

//tenemos que checar si la posicion dentro del rompecabezas es la correcta
function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
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

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    // Intercambio posiciones en la grilla
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);
    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

//tengo que representar esos movimeintos dentro del dom

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    // Intercambio posiciones en el DOM
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2);

    var padre = elementoPieza1.parentNode;

    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

//actualizar los movimientos

function actualizarUltimoMovimiento(direccion){
    var ultimoMov = document.getElementById('flecha');
    switch(direccion){
        case codigosDireccion.ARRIBA:
            ultimoMov.textContent = '↑';
            break;
        case codigosDireccion.ABAJO:
            ultimoMov.textContent = '↓';
            break;
        case codigosDireccion.DERECHA:
            ultimoMov.textContent = '→';
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMov.textContent = '←';
            break;
    }
}




function mezclarPiezas(veces){
    if(veces <= 0){
        alert("hola");
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];

    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)]; //barajeando

    moverEnDireccion(direccion);

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}

//vamos a capturar las teclas que este ingresando el jugador

function capturarTeclas(){
    //para saber que esta moviendo
    document.body.onkeydown = (function(evento) {
        if(evento.which === codigosDireccion.ABAJO || evento.which === codigosDireccion.ARRIBA || evento.which === codigosDireccion.DERECHA || evento.which === codigosDireccion.IZQUIERDA){
            moverEnDireccion(evento.which);
            actualizarUltimoMovimiento(evento.which);

            var gano = checarSiGano();
            if(gano){
                setTimeout(function(){
                    mostrarCartelGanador();
                }, 500);
            }
            evento.preventDefault; 
        }
    } );
}

//que se incie el rompecabezas
function iniciar(){
    mezclarPiezas(30);
    capturarTeclas();
}

//ejecutamos nuestro inicio

iniciar();

//mando a llamar a las instrucciones

mostrarInstrucciones(instrucciones);



