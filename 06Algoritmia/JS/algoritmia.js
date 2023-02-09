//vamos a obtener todos los valores por parte de los input
function problema2(){

var p2_x1 = document.querySelector('#p2-x1').value;

var p2_x2 = document.querySelector('#p2-x2').value;

var p2_x3 = document.querySelector('#p2-x3').value;

var p2_x4 = document.querySelector('#p2-x4').value;

var p2_x5 = document.querySelector('#p2-x5').value;

var p2_y1 = document.querySelector('#p2-y1').value;

var p2_y2 = document.querySelector('#p2-y2').value;

var p2_y3 = document.querySelector('#p2-y3').value;

var p2_y4 = document.querySelector('#p2-y4').value;

var p2_y5 = document.querySelector('#p2-y5').value;

//construir el vector
var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];

var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

//ordeno los vectores

v1 = v1.sort(function (a, b){
    return b-a;
});

v2 = v2.sort(function (a, b){
    return b-a;
});

v2 = v2.reverse();

//el producto escalar

var p2_producto = 0;

for(var i = 0; i < v1.length; i++){
    p2_producto += v1[i]*v2[i];
}

document.querySelector('#p2-output').textContent = 'Producto Escalar Minimo: ' + p2_producto;

}