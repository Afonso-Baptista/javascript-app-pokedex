
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
        //Explanation: if-else statement to check whether new pokemon entered is an object.
        if (typeof newPokemon === 'object') {
            pokemonList.push(newPokemon);
        } else {
            console.log('Did not add - this must be an object');
        }
    }

    //Explanation: created function to add, within the pokemon-list ul, list items with buttons holding a Pokemon's name as its inner text.
    function addListItem(pokemon) {
        let expandablePokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');
        listItem.appendChild(button);
        expandablePokemonList.appendChild(listItem);
    }

    //Explanation: This IIFE will ultimately return the object below, with key-value pairs associated with the functions above.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };
})();

/*Explanation: created a function to print the pokemon in any array, using a 'forEach()' loop.
Inside the forEach() loop is calling the addListItem function above*/
function printArrayDetails(list) {
    list.forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
}

/*Explanation: this calls the printArrayDetails function for the pokemonList array, which is inside the pokemonRepository 
IIFE and thus needs to be called as below.*/
printArrayDetails(pokemonRepository.getAll());
