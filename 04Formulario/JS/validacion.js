
function validar(formulario){
    if(formulario.nombre.value.length < 3){
        alert("Escriba por lo menos 3 caracteres en el campo nombre");
        formulario.nombre.focus();
    }
}