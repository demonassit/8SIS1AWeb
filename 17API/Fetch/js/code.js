//para mi api debo definir de donde la voy a consumir
const url = 'http://localhost:3000/8SIS1A/17API/api/articulos';


//obtengo los elementos

const contenedor = document.querySelector('tbody');

let resultados = '';

//para obtener los elementos que se agregan del modal
const modalArticulo =  new bootstrap.Modal(document.getElementById('modalArticulo'));

const formArticulo = document.querySelector('form');

const nombre = document.getElementById('nombre');

const precio = document.getElementById('precio');

const stock = document.getElementById('stock');

let opcion = ''; //esta nos va a servir para guardar el edo

btnCrear.addEventListener('click', ()=>{
    //primero tenemos que vaciar los campos
    nombre.value='';
    precio.value='';
    stock.value='';

    //debo de poder ejecutar el modal 
    modalArticulo.show();

    //vamos a cdar las opciones al boton
    opcion = 'crear';
});

//debo crear una funcion que se encargue de mostrar todos los articulos 

const mostrar = (articulos) =>{
    //tenemos que iterar dentro de la tabla de la bd para obtener todos los articulos
    articulos.forEach(articulo => {
        resultados += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.nombre}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.stock}</td>
                <td class="text-center" > <a class=btnEditar btn btn-primary >Editar</a> <a class=btnBorrar btn btn-danger >Borrar</a>  </td>
            </tr>
        `
    });
    //debo mostrar los resultados
    contenedor.innerHTML = resultados;
}

//necesito mostrar los elementos

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));


    //necesito saber que pasa con el evento para guardar

    const on = (element, event, selector, handler)=>{
        console.log(element);
        console.log(event);
        console.log(selector);
        console.log(handler);
        element.addEventListener(event, e => {
            if(e.target.closest(selector)){
                handler(e);
            }
        });
    }

    //borrar el articulo
    on(document, 'click', 'btnBorrar', e => {
        const fila = e.target.parentNode.parentNode;
        const id = fila.firstElementChild.innerHTML;
        alertify.confirm("Este es un dialogo de confirmacion", function(){
            fetch(url+id, {
                method : 'DELETE'
            })
            .then(res => res.json())
            .then( () => location.reload());
        }),
        function(){
            alertify.error('Cancel');
        }
    });

    //quiero editar

    let idFrom = 0;
    on(document, 'click', 'btnEditar', e => {
        const fila = e.target.parentNode.parentNode;
        idFrom = fila.children[0].innerHTML;
        const nombreFrom = file.children[1].innerHTML;
        const precioFrom = file.children[2].innerHTML; 
        const sctokFrom = file.children[3].innerHTML;
        nombre.value = nombreFrom;
        precio.value = precioFrom;
        stock.value = sctokFrom;  
        opcion = 'editar';
        modalArticulo.show();
       
    });

    //crear y editar

    formArticulo.addEventListener('submit', (e)=>{
        e.preventDefault();
        if(opcion == 'crear'){
            fetch(url, {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                }, 
                body : JSON.stringify({
                    nombre : nombre.value,
                    precio : precio.value,
                    stock : stock.value
                })
            })
            .then(response => response.json())
            .then(data => {
                const nuevoArticulo = [];
                nuevoArticulo.push(data);
                mostrar(nuevoArticulo);
            });
        }
        if(opcion == 'editar'){
            fetch(url, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json'
                }, 
                body : JSON.stringify({
                    nombre : nombre.value,
                    precio : precio.value,
                    stock : stock.value
                })
            })
            .then(response => response.json())
            .then(response => location.reload());
        }
        modalArticulo.hide();
    });