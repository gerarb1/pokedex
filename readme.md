# Pokédex Interactiva

Una Pokédex web que obtiene datos desde la PokéAPI, permite filtrar Pokémon por tipo, buscar por nombre y ver estadísticas y habilidades en cartas interactivas.

## Tecnologías usadas

HTML5

CSS3 (Flexbox/Grid, animaciones)

JavaScript (Fetch API, Promesas, DOM)

PokéAPI

## Estructura del proyecto

```text
pokedex/
│
├── index.html             # Archivo principal
├── README.md              # Documentación del proyecto
├── styles/
│   └── styles.css         # Estilos principales
├── scripts/
│   └── script.js          # Lógica JS (con fetch, filtrado, animaciones)         # Opcional, si quieres guardar JSON de prueba
```

## Instrucciones para correrlo

abre index.html en tu navegador moderno.

## Funcionalidades principales

Listado de Pokémon con cartas.

Filtros por tipo y búsqueda por nombre.

Fondo dinámico según tipo de Pokémon.

## Explicación del script.js

El script usa fetch para obtener información de la PokéAPI. Los Pokémon se renderizan dinámicamente en el DOM, y se aplican efectos visuales y animaciones para mostrar estadísticas y detalles de manera interactiva.
