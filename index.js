import { getPokemonTypeMatchups } from "./PokemonAPI.js";


function getTeamTypes() {
    let myPokemon = [];
    let pokemonMatchUps = []
    for (let i = 0; i < 6; i++) {
        myPokemon[i] = document.getElementById('pokemon' + (i + 1)).value.toLowerCase();
    }
    for (let i = 0; i < 6; i++) {
        document.getElementById("output" + (i + 1)).innerHTML = "Loading Information";
        pokemonMatchUps[i] = getPokemonTypeMatchups(myPokemon[i], i + 1);
    }
}
function findWeaknesse() {
    let pokemonMatchUps = getInformation();
    let weaknessTable = tableSetUp(pokemonMatchUps);
    let count;
    for (let i = 0; i < 6; i++) {
        count = 0;
        for (let key in pokemonMatchUps[i].weakness) {
            if (pokemonMatchUps[i].weakness[key] < 1) {
                weaknessTable[count][1]++;
            } else if (pokemonMatchUps[i].weakness[key] == 1) {
                weaknessTable[count][2]++;
            } else if (pokemonMatchUps[i].weakness[key] > 1) {
                weaknessTable[count][3]++;
            }
            count++;
        }
    }
    printTable(weaknessTable);
}
function getInformation() {
    let pokemonMatchUps = [];
    let temp;
    for (let i = 0; i < 6; i++) {
        temp = document.getElementById("storeData" + (i + 1)).innerHTML;
        pokemonMatchUps[i] = JSON.parse(temp);
    }
    return pokemonMatchUps;
}
function printTable(table) {
    let myTable = "<table><tr><th>Strong Against</th><th>Normal Against</th><th>Weak Against</th></tr>"
    for (let i = 0; i < table.length; i++) {
        myTable += "<tr>"
        for (let j = 0; j < table[i].length; j++) {
            myTable += `<td>${table[i][j]}</td>`
        }
        myTable += "</tr>"
    }
    myTable += "</table>";
    document.getElementById("teamWeeknesses").innerHTML = myTable;
}
function tableSetUp(pokemonMatchUps) {
    let weaknessTable = []
    for (let key in pokemonMatchUps[0].weakness)
        weaknessTable.push([key,0, 0, 0])
    return weaknessTable;
}
window.findWeaknesse = findWeaknesse;
window.getTeamTypes = getTeamTypes;

