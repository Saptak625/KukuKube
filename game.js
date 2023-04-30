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
    document.getElementById('diff_scale_final').innerHTML = window.diff_scale === 'on' ? 'Yes' : 'No';
    document.getElementById('diff_factor_final').innerHTML = window.diff_factor;
    document.getElementById('diff_max_final').innerHTML = window.diff_scale === 'on' ? Math.ceil(diff * Math.pow(window.diff_factor, window.score)) : window.diff;
    document.getElementById('time_final').innerHTML = window.t_initial;
    document.getElementById('score_final').innerHTML = window.score;
}

function makeNewGrid(gridSize, diff) {
    gridElement.innerHTML = '';
    // Generate random color and lighter hue color
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    let scaled_diff = diff;
    if (window.diff_scale === 'on') {
        scaled_diff = Math.ceil(diff * Math.pow(window.diff_factor, window.score));
    }
    console.log(scaled_diff);
    let color = `rgb(${r}, ${g}, ${b})`;
    let lighterColor = `rgb(${r + scaled_diff}, ${g + scaled_diff}, ${b + scaled_diff})`;

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

function startGame(gridSize, diff, diff_scale, diff_factor, t) {
    //Set global variables
    window.gridSize = gridSize;
    window.diff = diff;
    window.diff_scale = diff_scale;
    window.diff_factor = diff_factor;
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
