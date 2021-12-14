
/*Explanation: created an Immediately Invoked Function Expression (IIFE) to wrap the previous 'global variables' (e.g. pokemonList) and
turn them into 'local variables', so they are protected from changes and don't conflict with other variables or external code.*/
let pokemonRepository = (function() {
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

    //Explanation: created function to return all items within the pokemonList array, on demand.
    function getAll() {
        return pokemonList;
    }

    //Explanation: created function to, when required, add new pokemon to the pokemonList array.
    function add(newPokemon) {
        pokemonList.push(newPokemon);
    }

    //Explanation: This IIFE will ultimately return the object below, with key-value pairs associated with the functions above.
    return {
        getAll: getAll,
        add: add
    };
})();

/*Explanation: created a function to print the names & heights of pokemon in any array, using a 'forEach()' loop.
Added an if-else statement to highlight the largest pokemon in the array.*/
function printArrayDetails(list) {
    list.forEach(function(pokemon) {
        if (pokemon.height >= 1.0) {
            document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') - Wow, that\'s big! </p>');
        } else {
            document.write('<p>' + pokemon.name + ' (height: ' + pokemon.height + ') </p>');
        }
    });
}

/*Explanation: this calls the printArrayDetails function for the pokemonList array, which is inside the pokemonRepository 
IIFE and thus needs to be called as below.*/
printArrayDetails(pokemonRepository.getAll());
