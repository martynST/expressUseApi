import { getPokemonTypeMatchups } from "./PokemonAPI.js";

function getTeamTypes() {
    let myPokemon = [];
    for (let i = 0; i < 6; i++) {
        myPokemon[i] = document.getElementById('pokemon'+(i+1)).value.toLowerCase();
    }    
    let pokemonMatchUps = getPokemonTypeMatchups(myPokemon[0]);
    console.log(pokemonMatchUps);
    
}

window.getTeamTypes = getTeamTypes;

