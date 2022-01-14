
/*Explanation: created an Immediately Invoked Function Expression (IIFE) to wrap the previous 'global variables' (e.g. pokemonList) and
turn them into 'local variables', so they are protected from changes and don't conflict with other variables or external code.*/
let pokemonRepository = (function() {
    //Explanation: created an empty array of pokemon objects to use with the 'PokéAPI'.
    let pokemonList = [];
    //Explanation: This is the 'PokéAPI' link with a limit of 150 pokemon.
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
        //Explanation: added event listener to all pokemon buttons, to show pokemon details on 'click' event.
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    //Explanation: function to show details of the pokemon on the button 'click' event, called above within addListItem function.
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Explanation: This IIFE will ultimately return the object below, with key-value pairs associated with the functions above.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

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
