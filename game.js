let timeElement = document.getElementById('time');
let scoreElement = document.getElementById('score');
let gridElement = document.getElementById('game_grid');

function tileSelected(gridSize, diff, correct) {
    if (correct) {
        let score = Number(scoreElement.innerHTML);
        scoreElement.innerHTML = score + 1;
        makeNewGrid(gridSize, diff);
    } else {
        gameOver();
    }
}

function gameOver() {
    document.getElementById('game').style.display = 'none';
    document.getElementById('final').style.display = 'block';
    document.getElementById('grid_final').innerHTML = gridSize;
    document.getElementById('diff_final').innerHTML = diff;
    document.getElementById('time_final').innerHTML = t_initial;
    document.getElementById('score_final').innerHTML = document.getElementById('score').innerHTML;
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
    let t_initial = t;

    //Initialize first grid
    gridElement.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
    makeNewGrid(gridSize, Number(diff));

    timeElement.innerHTML = t;
    scoreElement.innerHTML = 0;

    function countdown() {
        if (t > 0) {
            t--;
            timeElement.innerHTML = t;
        } else {
            clearInterval(countdown);
            gameOver();
        }
    }
    setInterval(countdown, 1000);
}


window.tileSelected = tileSelected;
export { startGame };