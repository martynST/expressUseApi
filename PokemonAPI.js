let pokemonURL = "https://pokeapi.co/api/v2/pokemon";
let typeURL = "https://pokeapi.co/api/v2/type";

async function getPokemonTypes(id) {
    let response = await fetch(`${pokemonURL}/${id}`);
    let data = await response.json();
    let pokeTypes = getTypes(data);
    return pokeTypes;
}

async function getDamageRelations(myType) {
    let response = await fetch(`${typeURL}/${myType}`);
    let data = await response.json();
    return data;
}

function getTypes(pokemon) {
    let types = [];
    for (let i = 0; i < pokemon.types.length; i++) {
        types.push(pokemon.types[i].type.name);
    }
    return types;
}

function damageModifiers(typeData) {
    let noDamage = typeData.damage_relations.no_damage_from;
    let halfDamage = typeData.damage_relations.half_damage_from;
    let doubleDamage = typeData.damage_relations.double_damage_from;
    let typeMatchUp = getTypeMatchUp();
    for (let i = 0; i < noDamage.length; i++) {
        typeMatchUp[noDamage[i].name] = 0;
    }
    for (let i = 0; i < halfDamage.length; i++) {
        typeMatchUp[halfDamage[i].name] = 0.5;
    }
    for (let i = 0; i < doubleDamage.length; i++) {
        typeMatchUp[doubleDamage[i].name] = 2;
    }
    return typeMatchUp;
}

function getTypeMatchUp() {
    return {
        "normal": 1,
        "fighting": 1,
        "flying": 1,
        "poison": 1,
        "ground": 1,
        "rock": 1,
        "bug": 1,
        "ghost": 1,
        "steel": 1,
        "fire": 1,
        "water": 1,
        "grass": 1,
        "electric": 1,
        "psychic": 1,
        "ice": 1,
        "dragon": 1,
        "dark": 1,
        "fairy": 1
    }
}
function testingFunction() {

}
function combiningMatchUps(typeMatchUp) {
    let pokemonTypeMatchUpCombined = {};
    if (typeMatchUp.length == 2) {
        for (const key in typeMatchUp[0]) {
            pokemonTypeMatchUpCombined[key] = typeMatchUp[0][key] * typeMatchUp[1][key];
        }
    } else {
        for (const key in typeMatchUp[0]) {
            pokemonTypeMatchUpCombined[key] = typeMatchUp[0][key];
        }
    }
    return pokemonTypeMatchUpCombined;
}
export function getPokemonTypeMatchups(pokemon, pokemonNumber) {

    let typeMatchUpModifiers = [];
    let typeMatchIndividual = [];
    let pokemonTypeMatchUp = {
        "name": pokemon,
        "types": [],
        "weakness": getTypeMatchUp()
    }
    let pokeTypes = Promise.resolve(getPokemonTypes(pokemon));
    pokeTypes.then((pokeTypes) => {
        pokemonTypeMatchUp.types = pokeTypes;
        for (let i = 0; i < pokemonTypeMatchUp.types.length; i++) {
            typeMatchIndividual[i] = getDamageRelations(pokemonTypeMatchUp.types[i]);
        }
        Promise.all(typeMatchIndividual).then((typeMatchIndividual) => {
            for (let i = 0; i < typeMatchIndividual.length; i++) {
                typeMatchUpModifiers[i] = damageModifiers(typeMatchIndividual[i]);
            }
            pokemonTypeMatchUp.weakness = combiningMatchUps(typeMatchUpModifiers);
            document.getElementById("output"+pokemonNumber).innerHTML = "Information Loaded";  
            document.getElementById("storeData"+pokemonNumber).innerHTML = JSON.stringify(pokemonTypeMatchUp);
            return pokemonTypeMatchUp;
        })
    });
}