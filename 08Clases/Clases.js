//la clase papa que no se wiiii

class FiguraGeometrica{
    //constructor
    constructor(){
        //puede o no tener alguna implementacion
    }

    //metodos
    area(){
        //metodo que se encarga de calcular el area
    }
    perimetro(){
        //metodo para el calculo del perimetro 
        console.log("Este metodo calcula el perimetro");
    }


}

class Rectangulo extends FiguraGeometrica{
    constructor(base, altura){
        super();
        this._base = base;
        this._altura = altura;
        this._area = null;
        this._perimetro = null;
        this._actualizarArea = false;
        this._actualizarPerimetro = false;

    }

    

    set altura(altura){
        this._altura = altura;
        //si cambia el valor del area y perimetro hay que actualizarlos
        this._actualizarArea = true;
        this._actualizarPerimetro = true;
    }

    set base(base){
        this._base = base;
        //si cambia el valor del area y perimetro hay que actualizarlos
        this._actualizarArea = true;
        this._actualizarPerimetro = true;
    }

    get area(){
        if(this._actualizarArea || this._area){
            this._area = this.calcularArea();
        }
        return this._area;
    }

    get perimetro(){
        if(this._actualizarPerimetro || this._perimetro){
            this._perimetro = this.calcularPerimetro();
        }
        return this._perimetro;
    }

    calcularArea(){
        console.log(this._base);
        console.log(this._altura);
        return this._base * this._altura;
    }

    calcularPerimetro(){
        console.log(this._base);
        console.log(this._altura);
        return (this._base + this._altura)*2;
    }
}

const objetoRectangulo = new Rectangulo(2,5);

console.log(objetoRectangulo.calcularArea());






//Spread

/*
Es una sintaxis que nos permite a un elemento iterable (arreglo, matriz, vetor, cadena), ser extendido

vamos a tener dentro de ese elemento desde cero a mas argumentos que van a pasar por una funcion que se va a encargar de obtener cada dato sin necesidad de hacer una llamad a cada indice
*/ 


//tenemos el siguiente arreglo
const arregloOrdenadoMayorMeno = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

console.log(`arregloOrdenadoMayorMenor: ${arregloOrdenadoMayorMeno}`);

//vamos a suponer que podemos obtener tantas variables del arreglo como deseeamos a partir del patron

const [valorMasGrande] = arregloOrdenadoMayorMeno;
console.log(`valorMasGrande: ${valorMasGrande}`);

//vamos a obtener los elementos a partir del patron

const[valorMasGrande1, valorMasGrande2, valorMasGrande3, ...restoValores] = arregloOrdenadoMayorMeno;

console.log(`valorMasGrande1, valorMasGrande2, valorMasGrande3, ...restoValores: ${valorMasGrande1}, ${valorMasGrande2}, ${valorMasGrande3},${restoValores}`);

//destructuracion


//vamos a realizar una busqueda y queremos simplificarla

const resultadoDBusqueda = {
    resultados: [
        "resultado 1",
        "resultado 2",
        "resultado 3",
        "resultado 4",
        "resultado 5",
        "resultado 6",
        "resultado 7"
    ], 
    total : 7,
    mejorCoincidencia : "resultado 3"
};

console.log(`Resultados de la Busqueda: ${resultadoDBusqueda}`);

//vamos a suponer que solo nos interesa imprimir la mejor coincidencia

const {mejorCoincidencia} = resultadoDBusqueda;

console.log(`mejor coincidencia: ${mejorCoincidencia}`);

//supongamos que queremos cambiar el nombre, derivado a que necesitamos mantener la consistencia del codigo acorde a las nomenclaturas

const {mejorCoincidencia: nuevoNombre} = resultadoDBusqueda;

console.log(`Este es mi nuevo nombre: ${nuevoNombre}`);


//vamos agregar informacion

const copiadelResultadoDeBusqueda = {...resultadoDBusqueda};

console.log(`copia del resultado de busqueda: ${copiadelResultadoDeBusqueda}`);

//modificamos 

const copiadelResultadoDeBusquedaModificar = {...resultadoDBusqueda, cadenaBuscada : "resultado 3"};

console.log(`copia del resultado de busqueda modificada: ${copiadelResultadoDeBusquedaModificar}`);

