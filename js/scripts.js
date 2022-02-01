let pokemonRepository = (function() {
    
    let modalContainer = document.querySelector('#pokemonModal');
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1118';

    function getAll() {
        return pokemonList;
    }

    function add(newPokemon) {
        if (typeof newPokemon === 'object') {
            pokemonList.push(newPokemon);
        } else {
            console.log('Did not add - this must be an object');
        }
    }

    function addListItem(pokemon) {
        let expandablePokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add("list-group-item");
    
        let openModalButton = document.createElement('button');
        openModalButton.innerText = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
        openModalButton.classList.add("button-class", "btn", "btn-primary", "btn-lg");
        openModalButton.setAttribute('data-target', '#pokemonModal');
        openModalButton.setAttribute('data-toggle', 'modal');

        listItem.appendChild(openModalButton);
        expandablePokemonList.appendChild(listItem);

        openModalButton.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
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

    function showModal(item) {
        let modalHeader = $('.modal-header');
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        modalTitle.empty();
        modalBody.empty();
    
        let titleElement = $('<h1>' + item.name[0].toUpperCase() + item.name.substring(1) + '</h1>');
        let heightElement = $('<p>' + 'Height: ' + item.height + '</p>');
        let weightElement = $('<p>' + 'Weight: ' + item.weight + '</p>');
        let pokeTypes = item.types;
        let typesElement = $('<p>' + 'Type: ' + pokeTypes.join(', ') + '</p>');
        let pokeAbilities = item.abilities;
        let abilitiesElement = $('<p>' + 'Abilities: ' + pokeAbilities.join(', ') + '</p>');
        let imageElement = $('<img class="modal-img" style="width:50%">');
        imageElement.attr("src", item.imageUrl);

        modalTitle.append(titleElement);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
        modalBody.append(imageElement);
    }

    $(document).ready(function(){
        $('#search-pokemon').on('keyup', function() {
            let value = $(this).val().toLowerCase();
            $(".search-button").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


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