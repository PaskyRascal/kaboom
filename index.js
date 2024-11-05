let gameActive = false;
let score = 0;

function generateRandomValues(numZeros) {
    const buttons = document.querySelectorAll('.button-grid button');
    let zerosCount = 0;

    buttons.forEach(button => {
        button.style.backgroundColor = '#333'; // Reset background color
        button.disabled = false; // Enable buttons
        button.dataset.value = ''; // Reset value

        if (zerosCount < numZeros) {
            if (Math.random() < 0.5) {
                button.dataset.value = '0';
                zerosCount++;
            } else {
                button.dataset.value = '1';
            }
        } else {
            button.dataset.value = '1';
        }
    });
    gameActive = true;
    score = 0; // Reset score
    document.getElementById('score').textContent = `Score: ${score}`;
}

document.getElementById('playButton').addEventListener('click', function() {
    const numZeros = parseInt(document.getElementById('numZeros').value, 10);
    const totalButtons = document.querySelectorAll('.button-grid button').length;

    if (numZeros > 0 && numZeros < totalButtons) {
        generateRandomValues(numZeros);
        this.classList.add('active');
        this.textContent = 'Game On';
    } else {
        alert(`Please enter a number between 1 and ${totalButtons - 1}`);
    }
});

document.querySelectorAll('.button-grid button').forEach(button => {
    button.addEventListener('click', function() {
        if (gameActive && !button.disabled) {
            button.disabled = true; // Disable the button after click
            if (button.dataset.value === '0') {
                button.style.backgroundColor = 'red';
                document.querySelectorAll('.button-grid button').forEach(btn => btn.disabled = true);
            } else {
                button.style.backgroundColor = 'green';
                score++;
                document.getElementById('score').textContent = `Score: ${score}`;
            }
        }
    });
});