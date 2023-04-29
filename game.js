let timeElement = document.getElementById('time');
let scoreElement = document.getElementById('score');
let gridElement = document.getElementById('game_grid');

function tileSelected(gridSize, diff, correct) {
    if (correct) {
        window.score++;
        scoreElement.innerHTML = window.score;
        makeNewGrid(gridSize, diff);
        window.t = window.t_initial;
    } else {
        gameOver();
    }
}

function gameOver() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('final').style.display = 'block';
    document.getElementById('grid_final').innerHTML = window.gridSize;
    document.getElementById('diff_final').innerHTML = window.diff;
    document.getElementById('time_final').innerHTML = window.t_initial;
    document.getElementById('score_final').innerHTML = window.score;
}

function makeNewGrid(gridSize, diff) {
    gridElement.innerHTML = '';
    // Generate random color and lighter hue color
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let color = `rgb(${r}, ${g}, ${b})`;
    let lighterColor = `rgb(${r + diff}, ${g + diff}, ${b + diff})`;

    // Generate random index for the correct button
    let correctIndex = Math.floor(Math.random() * gridSize * gridSize);
    for (let i = 0; i < gridSize * gridSize; i++) {
        if (i == correctIndex) {
            gridElement.innerHTML += `<button class="rounded-square rounded-lg" style="background-color: ${lighterColor}" onclick="window.tileSelected(${gridSize}, ${diff}, true)"></button>`
        } else {
            gridElement.innerHTML += `<button class="rounded-square rounded-lg" style="background-color: ${color}" onclick="window.tileSelected(${gridSize}, ${diff}, false)"></button>`
        }
    }
}

function startGame(gridSize, diff, t) {
    //Set global variables
    window.gridSize = gridSize;
    window.diff = diff;
    window.t = t;
    window.t_initial = t;
    window.score = 0;

    //Initialize first grid
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    makeNewGrid(gridSize, Number(diff));

    timeElement.innerHTML = window.t;
    scoreElement.innerHTML = window.score;

    function countdown() {
        if (window.t > 0) {
            window.t--;
            timeElement.innerHTML = window.t;
        } else {
            clearInterval(countdown);
            gameOver();
        }
    }
    setInterval(countdown, 1000);
}


window.tileSelected = tileSelected;
export { startGame };