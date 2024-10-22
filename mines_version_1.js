let gameActive = true;

function generateRandomValues(numZeros) {
    const buttons = document.querySelectorAll('.button-grid button');
    let zerosCount = 0;

    buttons.forEach(button => {
        if (zerosCount < numZeros) {
            button.textContent = Math.random() < 0.5 ? '0' : '1';
            if (button.textContent === '0') {
                zerosCount++;
            }
        } else {
            button.textContent = '1';
        }
        button.classList.remove('revealed'); // Hide text initially
        button.disabled = false; // Enable buttons
    });
    gameActive = true;
}

document.getElementById('playButton').addEventListener('click', function() {
    const numZeros = parseInt(document.getElementById('numZeros').value, 10);
    generateRandomValues(numZeros);
});

document.querySelectorAll('.button-grid button').forEach(button => {
    button.addEventListener('click', function() {
        if (gameActive) {
            button.classList.add('revealed'); // Reveal text on click
            if (button.textContent === '0') {
                gameActive = false;
                alert('Game Over! You clicked a 0.');
                document.querySelectorAll('.button-grid button').forEach(btn => btn.disabled = true);
            }
        }
    });
});

document.getElementById('endButton').addEventListener('click', function() {
    if (gameActive) {
        alert('Congratulations! You won the game.');
        gameActive = false;
        document.querySelectorAll('.button-grid button').forEach(btn => btn.disabled = true);
    }
});