let pokemonURL = "https://pokeapi.co/api/v2/pokemon";
let typeURL = "https://pokeapi.co/api/v2/type";

async function getPokemonTypes(id) {
    let response = await fetch(`${pokemonURL}/${id}`);
    let data = await response.json();
    let pokeTypes = getTypes(data);  
    return pokeTypes;
}
function getTypes(pokemon) {
    let types = [];
    for (let i = 0; i < pokemon.types.length; i++) {
        types.push(pokemon.types[i].type.name);
    }
    return types;
}

async function getDamageRelations(myType) {
    let response = await fetch(`${typeURL}/${myType}`);
    let data = await response.json();
    return data;
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

function getTypeMatchUp () {
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

function testingFunction2(typeMatchUp) {
    let pokemonTypeMatchUpCombined = {};
    if (typeMatchUp.length == 2) {
        for (const key in typeMatchUp[0]) {
            pokemonTypeMatchUpCombined[key] = typeMatchUp[0][key]*typeMatchUp[1][key];
        }
    } else {
        for (const key in typeMatchUp[0]) {
            pokemonTypeMatchUpCombined[key] = typeMatchUp[0][key];
        }
    }
    return pokemonTypeMatchUpCombined;
}
export function getPokemonTypeMatchups(pokemon) {
    
    let typeMatchUp = [];    
    let pokemonTypeMatchUp =  {
        "name": pokemon,
        "types": [],
        "weakness": getTypeMatchUp()
    }
    let pokeTypes = getPokemonTypes(pokemon);

    let typeMatchIndividual = [];
    for (let i = 0; i <  pokemonTypeMatchUp.types.length; i++) {
        typeMatchIndividual[i] = getDamageRelations(pokemonTypeMatchUp.types[i]);
    }

    for (let i = 0; i < typeMatchIndividual.length; i++) {
        typeMatchUp[i] = damageModifiers(typeMatchIndividual[i]);            
    }
    pokemonTypeMatchUp.weakness = testingFunction2(typeMatchUp)
    //console.log(pokemonTypeMatchUp); 
    console.log(pokemonTypeMatchUp);

    return pokemonTypeMatchUp;
}

 function startHere(pokemon) {
    let pokemonTypeMatchUp = [];
    for (let i = 0; i < 6; i++) {
        pokemonTypeMatchUp[i] = getPokemonTypeMatchups(pokemon[i]);
    }
   console.log(pokemonTypeMatchUp);
    // Promise.all(pokemonTypeMatchUp).then((pokemonTypeMatchUp) => {console.log(pokemonTypeMatchUp)});
}

async function getPokemonStuff(myPokemon) {
    const response = await fetch(`${pokemonURL}/${myPokemon}`);
    const pokemonDeets = await response.json;
    const pokemonTypes = getTypes(pokemonDeets)
    const pokemonTypeInfo = [];
    for (const i = 0; i < pokemonTypes.length; i++) {
        const response = await fetch(`${typeURL}/${pokemonTypes[i]}`);
        const typeData = await response.json();
        pokemonTypeInfo.push(typeData);
    }
}