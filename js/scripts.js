
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

/*Explanation: created a 'for' loop to print the names & heights of pokemon in the pokemonList array, onto the document.
Added an if-else statement to highlight the largest pokemon in the array.*/
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height >= 1.0) {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') - Wow, that\'s big! </p>');
    } else {
        document.write('<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') </p>');
    }
}