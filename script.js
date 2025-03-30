// script.js
const gameGrid = document.getElementById('gameGrid');
const livesCount = document.getElementById('livesCount');
const gameOverScreen = document.getElementById('gameOver');
const restartButton = document.getElementById('restartButton');
const cardsArray = [
    'apple', 'apple', 'dog', 'dog', 'cat', 'cat',
    'banana', 'banana', 'star', 'star', 'bug', 'bug'
]; // 6 pairs

let flippedCards = [];
let matchedPairs = 0;
let lives = 10;

restartButton.addEventListener('click', restartGame);

// Shuffle array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create cards
function createBoard() {
    gameGrid.innerHTML = ''; // Clear previous grid
    const shuffledCards = shuffle([...cardsArray]);
    shuffledCards.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        
        // Add text instead of just an image
        const text = document.createElement('span');
        text.textContent = item;
        text.style.position = 'absolute'; // Position text on top
        text.style.top = '50%';
        text.style.left = '50%';
        text.style.transform = 'translate(-50%, -50%)'; // Center the text
        text.style.color = 'black'; // Make text visible
        text.style.fontSize = '20px'; // Adjust size as needed
        text.style.fontWeight = 'bold';
        
        cardFront.appendChild(text);
        card.appendChild(cardBack);
        card.appendChild(cardFront);
        card.addEventListener('click', flipCard);
        gameGrid.appendChild(card);
    });
}

// Flip card logic
function flipCard() {
    if (flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched') || lives <= 0) return;

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

// Check for match
function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => alert('You won!'), 500);
        }
    } else {
        lives--;
        updateLives();
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            if (lives <= 0) {
                showGameOver();
            }
        }, 1000); // Flip back after 1 second
    }
}

// Update lives display
function updateLives() {
    livesCount.textContent = '♥'.repeat(lives);
}

// Show game over screen
function showGameOver() {
    gameOverScreen.style.display = 'block';
}

// Restart game
function restartGame() {
    flippedCards = [];
    matchedPairs = 0;
    lives = 10;
    updateLives();
    gameOverScreen.style.display = 'none';
    createBoard();
}

// Start game
createBoard();