
/*Explanation: created an Immediately Invoked Function Expression (IIFE) to wrap the previous 'global variables' (e.g. pokemonList) and
turn them into 'local variables', so they are protected from changes and don't conflict with other variables or external code.*/
let pokemonRepository = (function() {
    
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
        listItem.classList.add('listItem-style');

        let openModalButton = document.createElement('button');
        //Explanation: the code below also serves to capitalize the pokemon's name
        openModalButton.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

        openModalButton.classList.add('search-button');
        openModalButton.classList.add("button-class", "btn", "btn-primary", "btn-lg");
        openModalButton.setAttribute('data-target', '#pokemonModal');
        openModalButton.setAttribute('data-toggle', 'modal');

        listItem.appendChild(openModalButton);
        expandablePokemonList.appendChild(listItem);

        //Explanation: added event listener to all pokemon buttons, to show pokemon details on 'click' event.
        openModalButton.addEventListener('click', function() {
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
                let typesDetails = details.types[i].type.name;
                item.types.push(typesDetails[0].toUpperCase() + typesDetails.substring(1));
            }
            item.abilities = [];
            for (let i = 0; i < details.abilities.length; i++) {
                let abilitiesDetails = details.abilities[i].ability.name;
                item.abilities.push(abilitiesDetails[0].toUpperCase() + abilitiesDetails.substring(1));
            }
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Explanation: function to show a Modal with details about a pokemon.
    function showModal(pokemon) {
        //Explanation: To select the modal elements in the HTML file
        let modalHeader = $('.modal-header');
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        //Explanation: To empty the modal each time a new modal is opened
        modalTitle.empty();
        modalBody.empty();

        let titleElement = $('<h1>' + pokemon.name[0].toUpperCase() + pokemon.name.substring(1) + '</h1>');

        let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');

        let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

        let pokeTypes = pokemon.types;
        let typesElement = $('<p>' + 'Type: ' + pokeTypes.join(', ') + '</p>');

        let pokeAbilities = pokemon.abilities;
        let abilitiesElement = $('<p>' + 'Abilities: ' + pokeAbilities.join(', ') + '</p>');

        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr("src", pokemon.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
        modalBody.append(imageElement);
    }

    //Explanation: pokemon search function, used in navbar
    $(document).ready(function(){
        $('#search-pokemon').on('keyup', function() {
            let value = $(this).val().toLowerCase();
            $(".search-button").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
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