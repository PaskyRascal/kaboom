let gameActive = true;
let score = 0;
let multiplier = 1;
let numZeros = 0;
let numOnes = 0;
let numRevealedOnes = 0;

function generateRandomValues(numZerosInput, numOnesInput) {
    const buttons = document.querySelectorAll('.button-grid button');
    let zerosCount = 0;
    let onesCount = 0;
    numZeros = numZerosInput;
    numOnes = numOnesInput;
    numRevealedOnes = 0;

    buttons.forEach(button => {
        const img = button.querySelector('img');
        if (zerosCount < numZeros) {
            img.src = 'https://twemoji.maxcdn.com/v/latest/72x72/1f621.png'; // Path to negative emoji
            button.dataset.value = '0';
            zerosCount++;
        } else if (onesCount < numOnes) {
            img.src = 'https://twemoji.maxcdn.com/v/latest/72x72/1f603.png'; // Path to positive emoji
            button.dataset.value = '1';
            onesCount++;
        } else {
            img.src = 'https://twemoji.maxcdn.com/v/latest/72x72/1f603.png'; // Path to positive emoji
            button.dataset.value = '1';
        }
        button.classList.remove('revealed'); // Hide image initially
        button.disabled = false; // Enable buttons
    });

    gameActive = true;
    score = 0;
    updateScoreDisplay();
    document.getElementById('popup').style.display = 'none'; // Hide popup
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = `Score: ${score.toFixed(2)}`;
}

document.getElementById('playButton').addEventListener('click', function() {
    const numZeros = parseInt(document.getElementById('numZeros').value, 10);
    const numOnes = parseInt(document.getElementById('numOnes').value, 10);
    if (numZeros + numOnes <= 25) {
        generateRandomValues(numZeros, numOnes);
    } else {
        alert('The total number of 0\'s and 1\'s must be less than or equal to 25.');
    }
});

document.querySelectorAll('.button-grid button').forEach(button => {
    button.addEventListener('click', function() {
        if (gameActive) {
            button.classList.add('revealed'); // Reveal image on click
            const img = button.querySelector('img');
            img.style.display = 'none'; // Hide image
            if (button.dataset.value === '0') {
                button.style.backgroundColor = 'red'; // Change background to red
                gameActive = false;
                document.getElementById('popup-text').textContent = `Multiplier x0.00`;
                document.getElementById('popup').style.display = 'block';
                document.querySelectorAll('.button-grid button').forEach(btn => btn.disabled = true);
            } else if (button.dataset.value === '1') {
                button.style.backgroundColor = 'green'; // Change background to green
                numRevealedOnes++;
                multiplier = (25 / (25 - numZeros)) * ((25 - numRevealedOnes) / (25 - numRevealedOnes - numZeros));
                score += multiplier;
                updateScoreDisplay();
            }
        }
    });
});

document.getElementById('endButton').addEventListener('click', function() {
    if (gameActive) {
        alert(`Congratulations! You won the game with a score of ${score.toFixed(2)}.`);
        gameActive = false;
        document.querySelectorAll('.button-grid button').forEach(btn => btn.disabled = true);
    }
});

document.getElementById('playAgainButton').addEventListener('click', function() {
    const numZeros = parseInt(document.getElementById('numZeros').value, 10);
    const numOnes = parseInt(document.getElementById('numOnes').value, 10);
    generateRandomValues(numZeros, numOnes);
});