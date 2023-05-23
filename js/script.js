
const pokemon__name = document.querySelector('.pokemon__name');
const pokemon__number = document.querySelector('.pokemon__number');
const pokemon__image = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonprev = document.querySelector('.bnt-prev');
const buttonnext = document.querySelector('.bnt-next');

let searchpokemon = 1;

const fetchPokemon = async(pokemon)=>{

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
}
    
    const renderPokemon = async(pokemon)=>{
    
        pokemon__name.innerHTML = 'Loading...';
        pokemon__number.innerHTML = '';

        const data = await fetchPokemon(pokemon);

        if (data){
            if(pokemon__image.src = data['sprites']['versions']['generation-v']['black-white']
            ['animated']['front_default']){
        pokemon__image.style.display = 'block';
        pokemon__name.innerHTML = data.name;
        pokemon__number.innerHTML = data.id;
        pokemon__image.src = data['sprites']['versions']['generation-v']['black-white']
        ['animated']['front_default'];
        input.value = '';
        searchpokemon = data.id;
        } else {
            pokemon__name.innerHTML = 'Not found :(';
            pokemon__number.innerHTML= '';
            pokemon__image.style.display = 'none';
        }
        }
    }


form.addEventListener('submit', (event) => {

    event.preventDefault();

    renderPokemon(input.value.toLowerCase());

} );

buttonprev.addEventListener('click', () => {
    if(searchpokemon > 1){
    searchpokemon -=1 ;
    renderPokemon(searchpokemon)
    }
} );
buttonnext.addEventListener('click', () => {
    searchpokemon += 1;
    renderPokemon(searchpokemon)
} );

renderPokemon(searchpokemon);



