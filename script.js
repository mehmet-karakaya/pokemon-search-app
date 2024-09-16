const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokeInfoGroup = document.getElementById("poke-info-group");
const pokemonName = document.getElementById("pokemon-name");
const pokemonID = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const imgContainer = document.getElementById("img-container");
const pokemonImg = document.getElementById("sprite");
const pokemonTypes = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchButton.addEventListener("click", () => {
  let strPoke = idChecker(searchInput.value);
  if (Number(strPoke) === -1) {
    alert("Pokémon not found");
  } else {
    strPoke = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/" + strPoke;
    fetchData(strPoke);
  }
});

const fetchData = async (strPoke) => {
  try {
    const res = await fetch(strPoke);
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    alert("Pokémon not found");
  }
};

const inputShaper = (str) => {
  str = str.replace(/[^a-zA-Z ♀♂]/g, "").toLowerCase();
  if (str.charAt(str.length - 1) == "♀" ) {
    str = str.slice(0,-1) + "-f";
    str.replace(/[^a-zA-Z -]/g, "");
    return str.replace(/[ ]/g, "-");
  } else if (str.charAt(str.length - 1) == "♂") {
    str = str.slice(0,-1) + "-m";
    str = str.replace(/[^a-zA-Z -]/g, "");
    return str.replace(/[ ]/g, "-");
  } else {
    str = str.replace(/[^a-zA-Z -]/g, "");
    return str.replace(/[ ]/g, "-");
  }
}

const idChecker = (str) => {
  if ( isNaN(str) ) {
    return inputShaper(str);
  } else if ( Number(str) < 1 || Number(str) > 10273) {
    return -1;
  } else {
    return Math.floor(str);
  }
}

const displayPokemon = (data) => {
  const { stats } = data;

  pokemonName.innerText = data.name.toUpperCase();
  pokemonID.innerText = "#"+data.id;
  weight.innerText = "Weight: " + data.weight;
  height.innerText = "Height: " + data.height;
  pokeInfoGroup.classList.remove("hidden");

  pokemonImg.src = data.sprites.front_default;
  imgContainer.classList.remove("hidden");

  hp.innerText = stats[0].base_stat;
  attack.innerText = stats[1].base_stat;
  defense.innerText = stats[2].base_stat;
  specialAttack.innerText = stats[3].base_stat;
  specialDefense.innerText = stats[4].base_stat;
  speed.innerText = stats[5].base_stat;

  types.innerHTML = "";
  for ( let i = 0; i < data.types.length; i++) {
    types.innerHTML += `<span class="grid1-item ${data.types[i].type.name}">${data.types[i].type.name}</span>`;
  }
  //
}
