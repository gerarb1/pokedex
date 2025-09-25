const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=151"; 
const listElement = document.getElementById("pokemon-list");
const searchInput = document.getElementById("search");

const pokeName = document.getElementById("poke-name");
const pokeImg = document.getElementById("poke-img");
const pokeInfo = document.getElementById("poke-info");

// Creamos un párrafo extra para la descripción
const pokeDetailsPanel = document.querySelector(".pokedex-details");
const pokeDescription = document.createElement("p");
pokeDescription.id = "poke-description";
pokeDetailsPanel.appendChild(pokeDescription);

let allPokemons = [];

// Paleta de colores por tipo
const typeColors = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  ice: "#98D8D8",
  fighting: "#C03028",
  poison: "#A040A0",
  ground: "#E0C068",
  flying: "#A890F0",
  psychic: "#F85888",
  bug: "#A8B820",
  rock: "#B8A038",
  ghost: "#705898",
  dragon: "#7038F8",
  dark: "#705848",
  steel: "#B8B8D0",
  fairy: "#EE99AC",
  normal: "#A8A878"
};

// Cargar lista de Pokémon
async function loadPokemonList() {
  const res = await fetch(API_URL);
  const data = await res.json();
  allPokemons = data.results;
  displayList(allPokemons);
}

// Mostrar lista en el panel izquierdo
function displayList(pokemons) {
  listElement.innerHTML = "";
  pokemons.forEach((pokemon, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${pokemon.name}`;
    li.addEventListener("click", () => showPokemonDetails(pokemon.url));
    listElement.appendChild(li);
  });
}

// Mostrar detalles en el panel derecho
async function showPokemonDetails(url) {
  const res = await fetch(url);
  const data = await res.json();

  // Datos básicos
  pokeName.textContent = `${data.name.toUpperCase()} (#${data.id})`;
  pokeImg.src = data.sprites.other["official-artwork"].front_default;
  pokeInfo.textContent = `Altura: ${data.height / 10} m | Peso: ${data.weight / 10} kg | Tipo: ${data.types.map(t => t.type.name).join(", ")}`;

  // Cambiar fondo según el tipo principal
  const mainType = data.types[0].type.name;
  pokeDetailsPanel.style.background = typeColors[mainType] || "#fff";

  // Obtener descripción (desde endpoint species)
  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();
  const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
  pokeDescription.textContent = flavorText ? flavorText.flavor_text.replace(/\f/g, " ") : "No hay descripción disponible.";
}

// Buscar Pokémon en la lista
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allPokemons.filter(p => p.name.includes(searchTerm));
  displayList(filtered);
});

loadPokemonList();
const pokeStats = document.getElementById("poke-stats");

async function showPokemonDetails(url) {
  const res = await fetch(url);
  const data = await res.json();

  // Datos básicos
  pokeName.textContent = `${data.name.toUpperCase()} (#${data.id})`;
  pokeImg.src = data.sprites.other["official-artwork"].front_default;
  pokeInfo.textContent = `Altura: ${data.height / 10} m | Peso: ${data.weight / 10} kg | Tipo: ${data.types.map(t => t.type.name).join(", ")} | Habilidades: ${data.abilities.map(a => a.ability.name).join(", ")}`;

  // Cambiar fondo según el tipo principal
  const mainType = data.types[0].type.name;
  pokeDetailsPanel.style.background = typeColors[mainType] || "#fff";

  // Descripción
  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();
  const flavorText = speciesData.flavor_text_entries.find(entry => entry.language.name === "es");
  pokeDescription.textContent = flavorText ? flavorText.flavor_text.replace(/\f/g, " ") : "No hay descripción disponible.";

  // Estadísticas
  pokeStats.innerHTML = "";
  data.stats.forEach(stat => {
    const statElement = document.createElement("div");
    statElement.classList.add("stat");

    statElement.innerHTML = `
      <div class="stat-name">${stat.stat.name.toUpperCase()} (${stat.base_stat})</div>
      <div class="stat-bar">
        <div class="stat-fill" style="width:${stat.base_stat > 100 ? 100 : stat.base_stat}%"></div>
      </div>
    `;

    pokeStats.appendChild(statElement);
  });
}
