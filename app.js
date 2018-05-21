// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again
game.addEventListener('mousedown', function(e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener("click", function(e) {
    let guess = parseInt(guessInput.value);
    //validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Pick a Number between ${min} and ${max}.`, "red");
        guessInput.style.borderColor = "red";
        game.classList.add('ahashakeheartache');
        guessBtn.addEventListener("click", function() {
            game.classList.remove('ahashakeheartache');
        });
    } else {
        // check if won
        if (guess === winningNum) {
            //Game over - won:
            gameOver(true, `WINNER! ${winningNum} is correct!`);
        } else {
            //incorrect number
            guessesLeft -= 1;
            if (guessesLeft === 0) {
                //Game over - lost:
                gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`);
            } else if (guess > winningNum) {
                setMessage(`Too high! Guesses left: ${guessesLeft}`, '#dda569');
                guessInput.style.borderColor = "#dda569";

            } else if (guess < winningNum) {
                setMessage(`Too low! Guesses left: ${guessesLeft}`, '#dda569');
                guessInput.style.borderColor = "#dda569";
            }
        }
    }
});

function gameOver(won, msg) {
    let color;
    won === true ? color = '#6AAE6A' : color = '#FF7676';
    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}