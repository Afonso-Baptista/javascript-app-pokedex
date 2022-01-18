
/*Explanation: created an Immediately Invoked Function Expression (IIFE) to wrap the previous 'global variables' (e.g. pokemonList) and
turn them into 'local variables', so they are protected from changes and don't conflict with other variables or external code.*/
let pokemonRepository = (function() {
    let modalContainer = document.querySelector('#modal-container');
    //Explanation: created an empty array of pokemon objects to use with the 'PokéAPI'.
    let pokemonList = [];
    //Explanation: This is the 'PokéAPI' link, with all pokemon, 1118 total.
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

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
            showModal(pokemon);
        });
    }

    //Explanation: function to fetch name & detailsUrl from PokéAPI.
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

    //Explanation: function to fetch details for each pokemon, from PokéAPI.
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Explanation: now we add the details (e.g. height, abilities) to the item, to the pokemon
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            //Explanation: added for loops for types and abilities, to iterate over multiple items
            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                item.types.push(details.types[i].type.name);
            }
            item.abilities = [];
            for (let i = 0; i < details.abilities.length; i++) {
                item.abilities.push(details.abilities[i].ability.name);
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Explanation: function to show a Modal with details about a pokemon.
    function showModal(pokemon) {
        //Explanation: To clear all existing modal content
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Explanation: Add the new modal content
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'X';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = "Height: " + pokemon.height;

        let weightElement = document.createElement('p');
        weightElement.innerText = "Weight: " + pokemon.weight;

        let typesElement = document.createElement('p');
        typesElement.innerText = "Type: " + pokemon.types;

        let abilitiesElement = document.createElement('p');
        abilitiesElement.innerText = "Abilities: " + pokemon.abilities;

        let imageElement = document.createElement('img');
        imageElement.setAttribute("src", pokemon.imageUrl);

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(weightElement);
        modal.appendChild(typesElement);
        modal.appendChild(abilitiesElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    //Explanation: function to hide the Modal above.
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //Explanation: to hide the modal when a user presses the 'Escape' key.
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideModal();  
        }
    });

    //Explanation: to hide the modal when a user presses outside the modal, on the modal container.
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
    });

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
    //Explanation: now the data is loaded
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});