// init variables

const guessButton = document.querySelector("#guess-button");
const numberOfLetters = document.querySelector("#number-of-letters");
const restToGuess = document.querySelector("#rest-to-guess");
const wordAttempt = document.querySelector("#word-attempt");
const wordTried = document.querySelector("#word-tried");
const wellPlaced = document.querySelector("#well-placed");
const missPlaced = document.querySelector("#miss-placed");
const notUseful = document.querySelector("#not-in-word");
const win = document.querySelector("#win");
let secretWord = prompt("Mot à deviner?").toUpperCase();
let tempWord = whatToGuess();


// init function

// function tryWord(attemptWord, secretWord) {
//     let arrSecretWord = secretWord.split('');
//     let arrAttemptWord = attemptWord.split('');
//     let result = {
//         wellPlaced: [],
//         missPlaced: [],
//         notUseful: []
//     };

//     for (let i = 0; i < secretWord.length; i++) {
//         if (arrAttemptWord[i] === arrSecretWord[i]) {
//             tempWord[i] = ` ${arrAttemptWord[i]}`;
//             result.wellPlaced.push(arrAttemptWord[i]);
//             result.missPlaced.push("_");
//             result.notUseful.push("_");
//         }
//     }
//     for (let i = 0; i < secretWord.length; i++) {
//         if (arrSecretWord.includes(arrAttemptWord[i]) && tempWord.includes(arrAttemptWord[i])) {
//             result.wellPlaced[i] = "_";
//             result.missPlaced[i] = arrAttemptWord[i];
//             result.notUseful[i] = "_";
//         }
//         else {
//             result.wellPlaced[i] = "_";
//             result.missPlaced[i] = "_";
//             result.notUseful[i] = arrAttemptWord[i];
//         }
//     }
//     return result;
// }

function tryWord(attemptWord, secretWord) {
    let arrSecretWord = secretWord.split('');
    let arrAttemptWord = attemptWord.split('');
    let tempSecret = [...arrSecretWord];
    let result = {
        wellPlaced: [],
        missPlaced: [],
        notUseful: []
    };

    for (let i = 0; i < arrAttemptWord.length; i++) {
        if (arrAttemptWord[i] === arrSecretWord[i]) {
            result.wellPlaced[i] = arrAttemptWord[i];
            tempSecret[i] = null;
        }
        else {
            result.wellPlaced[i] = "_";
        }
    }
    for (let i = 0; i < arrAttemptWord.length; i++) {
        if (result.wellPlaced[i] !== "_") {
            result.missPlaced[i] = "_";
            result.notUseful[i] = "_";
            continue;
        }
        const index = tempSecret.indexOf(arrAttemptWord[i]);
        if (index !== -1) {
            result.missPlaced[i] = arrAttemptWord[i];
            result.notUseful[i] = "_";
            tempSecret[index] = null;
        }
        else {
            result.missPlaced[i] = "_";
            result.notUseful[i] = arrAttemptWord[i];
        }
    }
    return result;
}

function guess() {
    let attemptWord = wordAttempt.value.toUpperCase();

    if (attemptWord === secretWord) {
        cleanBoard();
        wordTried.innerText = `Mot à trouver: ${secretWord}\n`;
        win.innerText = 'Vous avez gagné';
    }
    else {
        let result = tryWord(attemptWord, secretWord);

        for (let i = 0; i < secretWord.length; i++) {
            if (result.wellPlaced[i] !== "_") {
                tempWord[i] = ` ${result.wellPlaced[i]}`;
            }
        }

        wordAttempt.value = '';
        restToGuess.innerText = `Mot à trouver: ${tempWord}`;
        wordTried.innerText += `Mot tenté: "${attemptWord}"\n`;
        wellPlaced.innerText = `Bien placé: ${result.wellPlaced.join(', ')}`;
        missPlaced.innerText = `Mal placé: ${result.missPlaced.join(', ')}`;
        notUseful.innerText = `Pas dans le mot: ${result.notUseful.join(', ')}`;
    }
}

function cleanBoard() {
    wordAttempt.value = '';
    restToGuess.innerText = '';
    wordTried.innerText = '';
    wellPlaced.innerText = '';
    missPlaced.innerText = '';
    notUseful.innerText = '';
    win.innerText = '';
}

function whatToGuess() {
    let restToGuess = [secretWord[0]];
    for (let i = 1; i < secretWord.length; i++) {
        restToGuess.push(" _");
    }
    console.log(restToGuess);
    return restToGuess;
}

// execute code

numberOfLetters.innerText = `Nombre de lettres: ${secretWord.length}`;
restToGuess.innerText = `Mot à trouver: ${tempWord}`;
guessButton.addEventListener("click", guess);