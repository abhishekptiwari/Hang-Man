const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById('play-again');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification__container');
const finalMessage = document.getElementById('popup__final-message');

const figureParts = document.querySelectorAll('.figure__part');

const words = ['application', 'interface', 'programming', 'node', 'wizard', 'virus'];


function selectRandomWord(){
    const selectedWord = words[Math.floor(Math.random() * words.length)];
    console.log(selectedWord);
    return selectedWord;
}

let selectedWord = selectRandomWord();
// Contains the correct letters.
const correctLetters = [];
// Contains the wrong letters.
const wrongLetters = [];


// Show hidden word
function displayWord() {
    wordEl.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `).join('')}
    `;
    const innerword = wordEl.innerText.replace(/\n/g, '');
    console.log(innerword);
    if (innerword === selectedWord) {
        finalMessage.innerText = '🔥Congratulations you won!🔥🏆🥇';
        popup.style.display = 'flex';
    }
}


// Update the wrong letters 
function updateWrongLetterEl(){
    console.log('Update Wrong!');
    // Display wrong letters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // Showing the figure
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;
        if(index < errors){
            part.style.display="block";
        }else{
            part.style.display="none";
        }

    });

    // Check if lost
    if(wrongLetters.length === figureParts.length){
        console.log(figureParts.length);
        finalMessage.innerText = 'Unfortunately you lost. 😕';
        popup.style.display = "flex";
    }
}

// Showing the notification
function showNotification(){
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e => {
    // console.log(e.keyCode)
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if(selectedWord.includes(letter)){
            if(!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            }else{
                showNotification();
            }
        }else{
            if(!wrongLetters.includes(letter)){
                console.log(wrongLetters);
                wrongLetters.push(letter);
                updateWrongLetterEl();
            }else{
                showNotification();
            }
        }
    }
});

// Restart game 
playAgainBtn.addEventListener('click', () => {
    // Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = selectRandomWord();

    displayWord();

    updateWrongLetterEl();

    popup.style.display = "none";

})

displayWord();