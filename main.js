import { startGame } from './game.js';

// Determine what section to show
let url = window.location.search;

if (url.includes('?')) {
    document.getElementById('landing').style.display = 'none';
    document.getElementById('final').style.display = 'none';
    const params = new Proxy(new URLSearchParams(url), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
    let gridSize = params.grid;
    let diff = params.diff;
    let t = params.t;

    startGame(gridSize, diff, t);
} else {
    document.getElementById('game').style.display = 'none';
    document.getElementById('game_grid').style.display = 'none';
    document.getElementById('final').style.display = 'none';
}