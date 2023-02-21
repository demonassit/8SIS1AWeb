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

console.log(objetoRectangulo.perimetro);

