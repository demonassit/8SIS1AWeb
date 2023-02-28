/*
vamos a crear una api rest que nos permite obtener informacion sobre los diferentes pokemones a partir de la url : 
https://pokeapi.co

*/ 

const pokeApiUrl = "https://pokeapi.co/api/v2/";

//vamos a crear una funcion para obtener los elementos de la pokedex

const pokedex = () =>{

    //necesitamos un objeto que nos permita acceder a todos los campos para mostrar las estadisticas del pokemon, su busqueda e interaccion para visualizar cada elemento de todos los pokemones
    const pokemonStatElements = {
        hp: document.getElementById("pokemonStatHp"),
        attack: document.getElementById("pokemonStatAttack"),
        defense: document.getElementById("pokemonStatDefense"),
        specialAttack: document.getElementById("pokemonStatSpecialAttack"),
        specialDefense: document.getElementById("pokemonStatSpecialDefense"),
        speed: document.getElementById("pokemonStatSpeed")
    };

    //necesito un auxiliar que nos permita utilizar las clases del archivo de la css para los cambios del tipo de pokemon y su imagen
    let currentClassType = null;


    //esta es la imagen que vamos a utilizar para crear la carga 
    const imageTemplate = "<img class='pokedisplay' src='{imgSrc}' alt=''pokedisplay >";

    //este objeto sirve para guardar las otras rutas de las imagenes para cuando no encuentra al pokemon y la carga

    const images = {
        imgPokemonNotFound : "../img/404.png",
        imgLoading : "../img/loading.gif"
    };

    //necesito otro objeto que contenga las referencias de los elementos que se van a desplegar
    const container = {
        imageContainer: document.getElementById("pokedisplay-container"),
        pokemonTypesContainer: document.getElementById("pokemonTypes"),
        pokemonNameElement: document.getElementById("pokemonNameResult"),
        pokemonAbilitiesElement: document.getElementById("pokemonAbilities"),
        pokemonMovesElement: document.getElementById("pokemonMoves"),
        pokemonIdElement: document.getElementById("pokemonId")
    };

    //necesito un objeto para las referencias de los botones
    const buttons = {
        all: Array.from(document.getElementById("btn")),
        search: document.getElementById("btnSearch"),
        next: document.getElementById("btnUp"),
        previous: document.getElementById("btnDown")
    };

    //nuestra primera funcion que se encarga de mostrar el tipo de pokemon acorde a la busqueda de acuerdo al consumo de la api

    const processPokemonTypes = (pokemonData) => {
        let pokemonType= "";
        //utilizo la primera clase para dar color a los contenedores de acuerdo al tipo de pokemon
        const firstClass = pokemonData.types[0].type.name;

        pokemonData.types.forEach((pokemonTypeData)=>{
            pokemonType += `<span class="pokemon-type ${pokemonTypeData.type.name}" > ${pokemonTypeData.type.name}</span>`;
        });
        //se quita la clase previa del contenedor del tipo de pokemon de acuerdo a sus habilidades y movimientos del nuevo
        if(currentClassType){
            container.pokemonMovesElement.classList.remove(currentClassType);
            container.pokemonAbilitiesElement.classList.remove(currentClassType);
        }
        //se agregan los nuevos
        container.pokemonMovesElement.classList.add(firstClass);
        container.pokemonAbilitiesElement.classList.add(firstClass);
        currentClassType = firstClass;
        //agrego las etiquetas creadas de acuerdo a nuestro forEach
        container.pokemonTypesContainer.innerHTML = pokemonType;
    }

}