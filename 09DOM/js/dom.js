//una funcion para que cuando se aperture la pagina tome las dimensiones y se adecue al tamaño

window.onload = () => {
    //que carque un par de imagenes como carrucel
    //creamos nuestro conjunto de imagenes
    const imagenes = [
        //aqui van las url
        "https://images.alphacoders.com/127/1277109.jpg",
        "https://images4.alphacoders.com/801/80134.jpg",
        "https://images8.alphacoders.com/356/356391.jpg",
        "https://images8.alphacoders.com/371/371786.jpg"
    ];

    /*
    Vamos a crear una API que podamos controlar desde el DOM, para poder acceder a todos los elementos del HTML o documento para esto vamos a necesitar primeramente obtener varios de los id que tenemos en los componentes del documento. Para ello relaizaremos diferentes tipos de busqueda 
    */

    const display = document.getElementById("display");
    const botones = Array.from(document.getElementsByName("boton"));
    const campoMensaje = document.getElementById("mensaje");
    const mensajes = document.getElementById("mensajes");
    const colorValor = document.getElementById("colorValor");

    //vamos a crear una funcion que se encargue de ir a la siguiente imagen
    const imagenActual = 0;

    const imagenSiguiente = () => {
        //primero tenemos que acceder al arreglo de las imagenes que tenemos 
        if(imagenActual < imagenes.length - 1){
            imagenActual++;
        }else{
            imagenActual = 0;
        }
        display.src = imagenes[imagenActual];
    };

    const imagenAnterior = () => {
        if(imagenActual > 0){
            imagenActual--;
        }else{
            imagenActual = imagenes.length -1;
        }
        display.src = imagenes[imagenActual];
    }

    const pantallaCompleta = () => {
        //esto es una promesa porque nosotros hacemos una solicitud con el request con la esperanza de que nos devuelva una respuesta que en este caso es visualizar la pantalla completa
        display.requestFullscreen;
    }

    const mostrarMensaje = () => {
        //vamos a modificar el comportamiento interno de un componente de HTML porque nosotros vamos agregar nuevos componentes des JS, es por ello que ya se convierte en una pagina dinamica
        mensajes.innerHTML += `${campoMensaje.value}<br/>`;
        campoMensaje.value = "";
        //si queremos manipular los elementos recien creados tenemos que utilizar createElement y con ello podemos crear listas, botones, campos de texto, etc, por ejemplo
        //const lista = document.createElement("ul")
        //const elementoLista = document.createElement("li");
        //elementoLista.onclick = pnatallaCompleta;
        //elementoLista.innerHTML = `${campoMensaje.value}`;
        //lista.append(elementoLista);
        //mensajes.append(lista);
    };

    const cambiarColor = () => {
        colorValor.click();
    }

    const inicializar = () => {
        //necesito asignar desde la API los eventos
        botones.find(boton => boton.id === "siguiente").onclick = imagenSiguiente;
        botones.find(boton => boton.id === "anterior").onclick = imagenAnterior;
        botones.find(boton => boton.id === "pantallaCompleta").onclick = pantallaCompleta;
        botones.find(boton => boton.id === "mostrarMensaje").onclick = mostrarMensaje;
        botones.find(boton => boton.id === "cambiarColor").onclick = cambiarColor;

        colorValor.onchange = () => {
            mensajes.style.color = colorValor.value;
        };

        //el indice de la imagen
        display.src = imagenes[0];
    };

    inicializar();



}