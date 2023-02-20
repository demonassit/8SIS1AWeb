/*

Las variables que se ocupan dentro de JS son 3

var -> que actualmente esta siendo sustituida
let -> es una variable protegida que solo funciona
dentro de una fundion o delcaracion o fragmento
de codigo

const -> la cual es un valor constante en todo el 
documento

*/

//let x = "x";
/*
if(true){
    //declaramos una const 
    //const x = "x";
    var x = "z";
    console.log(x);
    
}

    
    console.log(x);
*/

/**
 * Funcion flecha
 * una funcion flecha es una funcion en JS, que a diferencia de una funcion normal no genera su propio contexto (this) necesita ser declarada antes de ser usada y no necesita el uso de un return
 */
/*
function sumarFuncionNormal(n1, n2){
    return n1+n2;
}

console.log(`sumarFuncionNormal(3,4): ${sumarFuncionNormal(3,4)}` );

/**
 * Una funcion flecha tiene:
 * "cadena" -> Id, clase, name, atributo
 * 
 * '' y "" funcionan igual id, clases, name ES6
 * 
 * `` es para incoporar codigo html e invocaciones a funciones
 */
/*
const sumaFuncionFlecha = (n1, n2) => n1+n2;

console.log(`sumaFuncionFlecha(5,6): ${sumaFuncionFlecha(5,6)}` );

//que pasaria si solo necesitamos un parametro

const cuadradoFuncionFlecha = n1 => n1**2;

console.log(`cuadradoFuncionFlecha(7): ${cuadradoFuncionFlecha(7)}` );

*/

const razasDePerros = [
    "Gran Danes",
    "Pastor Aleman",
    "Chihuahua",
    "Belga",
    "Pitbull",
    "Dalmata",
    "San Bernardo"
];

//recorremos
/*
for(let indice = 0; indice < razasDePerros.length; indice++){
    console.log(razasDePerros[indice]);
}


for(const raza of razasDePerros){
    console.log(raza);
}


for(const indice in razasDePerros){
    console.log(razasDePerros[indice]);
}


//forEach -> iterar sobre elementos del arreglo que no devuelven nada

razasDePerros.forEach((raza, indice, arregloOriginal) =>console.log(raza));

que pasa si omitimos un valor del forEach


razasDePerros.forEach(raza => console.log(raza));

con la funcion MAP
itera sobre los elementos del arreglo y regresa un arreglo diferente con el cual nos los muestra


const razasDePerrosEnMayusculas = razasDePerros.map((raza, indice, arregloOriginal)=> console.log(raza.toUpperCase()));

const razasDePerrosEnMayusculas = razasDePerros.map((raza)=> console.log(raza.toUpperCase()));

*/

/**
 * FIND
 * Nos permite buscar un elmento dentro del arreglo si lo encuentra, lo regresa y sino lanza un "undefinend"
 * 
 * Quiero buscar la raza chihuahua
 * 
 *   =   asignar    x = 3
 *   ==  comparar si son iguales  x == 3
 *   ===  comparar si son iguales e identicos porque devuelve T o F   x===3
 * 


if(razasDePerros.find((raza, indice, arregloOriginal) => 
    raza === "Chihuahua")){
        console.log("la raza se encuentra dentro del arreglo");
        console.log(razasDePerros);
    }else{
        //meterlo
        razasDePerros.push("Chihuahua");
        console.log("Se agrego la raza al arreglo");
        console.log(razasDePerros);
    }

FINDINDEX   

    Es similar a la busqueda, pero en lugar de regresar el elemento, regresa su indice, si no lo encuentra nos devuelve un -1 esta funcion es particularmente util si queremos modificar el elemento original dentro de un arreglo

     */

    const indicedeChihuahua = razasDePerros.findIndex((raza, indice, arregloOriginal) => raza === "Chihuahua");

    if(indicedeChihuahua > -1){
        //el resultado esperado porque si esta dentro del arreglo
        console.log(razasDePerros[indicedeChihuahua]);
        //aparte voy agregar que diga que la raza es pequeña y escandalosa
        razasDePerros[indicedeChihuahua] += "(Raza de perros pequeña y escandalosa)";
        console.log(razasDePerros[indicedeChihuahua]);
        console.log(razasDePerros);
    }