
//Explanation: created an array of pokemon objects to use throughout the web app.
let pokemonList = [
    {
        name: 'Pikachu', 
        height: 0.4, 
        weight: 6, 
        types: ['electric'], 
        abilities: ['Static', 'Lightningrod']
    },
    {
        name: 'Charmander', 
        height: 0.6, 
        weight: 8.5, 
        types: ['fire'], 
        abilities: ['Blaze', 'Solar-power']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        weight: 9, 
        types: ['water'], 
        abilities: ['Rain-dish', 'Torrent']
    },
    {
        name: 'Machamp', 
        height: 1.6, 
        weight: 130, 
        types: ['fighting'], 
        abilities: ['Guts', 'Steadfast', 'No-guard']
    }
];

/*Explanation: created a function to print the names & heights of pokemon in any array, using a 'for' loop.
Added an if-else statement to highlight the largest pokemon in the array.*/
function printArrayDetails(list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].height >= 1.0) {
            document.write('<p>' + list[i].name + ' (height: ' + list[i].height + ') - Wow, that\'s big! </p>');
        } else {
            document.write('<p>' + list[i].name + ' (height: ' + list[i].height + ') </p>');
        }
    }
}

//Explanation: this calls the printArrayDetails function for the pokemonList array. 
printArrayDetails(pokemonList);
