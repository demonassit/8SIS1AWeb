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

    //para las estadisticas del pokemon 

    const processPokemonStats = (pokemonData) => {
        //ocuparemos el operador ? para un encadenamiento opcional, 
        pokemonData.stats?.forEach((pokemonStatData)=>{
            //tengo que evaluar las estadisticas acorde al contenedor del tipo de pokemon si es que existe
            switch(pokemonStatData.stat.name){
                case "hp":
                    pokemonStatElements.hp.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.hp.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;
                case "attack":
                    pokemonStatElements.attack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.attack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;
                case "defense":
                    pokemonStatElements.defense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.defense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;
                case "special-attack":
                    pokemonStatElements.specialAttack.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.specialAttack.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;
                case "special-defense":
                    pokemonStatElements.specialDefense.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.specialDefense.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;
                case "speed":
                    pokemonStatElements.speed.innerHTML = pokemonStatData.base_stat;
                    pokemonStatElements.speed.style = `background: linear-gradient(0deg, rgba(0,118,255,1) ${pokemonStatData.base_stat}%, rgba(0,0,0,1) ${pokemonStatData.base_stat}%)`;
                    break;

            }
        });
    };

    //procesar los movimientos del pokemon en su respectivo contenedor

    const processPokemonMoves = (pokemonData) =>{
        let pokemonMovesContent = "";

        pokemonData.moves?.forEach((pokemonMove) => {
            //voy a ir agregando los movientos en formato de lista en su contenedor
            pokemonMovesContent += `<li>${pokemonMove.move.name}</li>`;

        });
        //lo imprimo en el html la lista
        container.pokemonMovesElement.innerHTML = pokemonMovesContent;
    }

    const processPokemonAbilities = (pokemonData) =>{
        let pokemonAbilitiesContent = "";

        pokemonData.abilities?.forEach((pokemonAbility) => {
            //voy a ir agregando los movientos en formato de lista en su contenedor
            pokemonAbilitiesContent += `<li>${pokemonAbility.ability.name}</li>`;

        });
        //lo imprimo en el html la lista
        container.pokemonAbilitiesElement.innerHTML = pokemonAbilitiesContent;
    }

    //vamos a poner la imagen cargando y deshabilitar los botones porque esta buscando al pokemon y no queremos que se envie otra solicitud mientras exista la busqueda

    const setLoading = () => {
        container.imageContainer.innerHTML = imageTemplate.replace("{imgSrc}", images.imgLoading);
        //desahabilito los botones
        buttons.all.forEach(button => button.disable = true);
    }

    //volver habilitarlos
    const setLoadingComplete = () => {
        buttons.all.forEach(button => checkDisabled(button));
    }

    //async   await

    /*
    Vamos a utilizar una funcion fecth la cual realizara la consulta correspondiente en la API solicitando los elementos de los contenedores acorde al tipo de peticion (nombre, stats, movimientos, habilidades, etc, obteniendo los recursos por medio de la url, o de forma local , cuyo objeto ayuda a establecer los parametros de la promesa.
        una promesa nos devuelve un then y un catch de acuerdo a un objeto json para su interpretacion)
    */ 

    const getPokemonData = async (pokemonName) => fetch(`${pokeApiUrl}pokemon/${pokemonName}`, {
        
    })

}