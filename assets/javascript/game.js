// Counts to keep track of # of guesses, wins and losses
var numOfGuessesLeft = 10;
var wins = 0;
var losses = 0;

//List of words from which to randomly select guessing word
var wordList = [
    'archipelago', 'coconut', 'tropical', 'hurricane', 'reggae', 'caribbean', 'fishing', 'relaxation', 'peninsula', 'islander', 'palms', 'oasis',
    'hammock', 'tranquility', 'steelpan', 'shoreline', 'sunglasses', 'carnival', 'vacation', 'tourist', 'rumpunch', 'sunshine', 'bachata',
    'paradise', 'cricket', 'seaside', 'rainforest', 'vegetation', 'snorkeling', 'yacht', 'snorkeling', 'cocktails', 'catamaran', 'sandcastle',
    'surfboard', 'mangrove', 'nutmeg', 'chutney', 'calypso', 'curry', 'crab', 'flora', 'fauna'
];

// Randomly selected word from wordList
var guessingWord = " ";

//The guessing array of empty letter holders to accept player's guesses
var guessingArray = [];

//Running list of incorrect guesses
var wrongGuesses = [];



// Function to start a new game
function newGame() {
    numOfGuessesLeft = 10;

    guessingWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(guessingWord);

    for (i = 0; i < guessingWord.length; i++) {
        guessingArray[i] = "_";
    }

    //Testing
    console.log(guessingArray.join(" "));

    document.getElementById("right-guesses").innerHTML = guessingArray.join(" ");

    document.getElementById("guess-counter").innerHTML = "<p> Guesses remaining: <br>" + numOfGuessesLeft + "</p>";

    document.getElementById("wrong-guesses").innerHTML = "Incorrect Guesses: <br>" + wrongGuesses.join(" ");

    document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>";


}

newGame();


function evaluateGuess() {
    //Check if guess is a letter

    document.onkeyup = function (event) {
        var guessCode = event.keycode;
        var guessLetter = event.key.toLowerCase();
        var guessLetterInWord;

        if (guessLetter.length !== 1) {
            alert("Please enter a single letter");
        } else if ((guessCode <= 64) || (guessCode >= 91)) {
            alert("Please enter letters only");
        } else {
            for (j = 0; j < guessingArray.length; j++) {
                if (guessingWord[j] === guessLetter) {
                    guessLetterInWord = true;
                    guessingArray[j] = guessLetter; //can these two steps happen within this if statement? How to test?
                } else {
                    wrongGuesses.push(guessLetter.toUpperCase());
                    numOfGuessesLeft--;
                }
            }
        }

    }
}

evaluateGuess();





// document.onkeyup = function(event) {
//    var guess = event.key.toLowerCase();


// //Game Code

// //Choose a word for the user to guess
// var guessingWord = wordList[Math.floor(Math.random() * wordList.length)];


// while (numOfGuessesLeft > 0) {
//     
//     var test = document.getElementById("demo")
//     test.innerHTML = guessingArray.join(" ");

//     if (guess.length !== 1) {
//         var msg = document.getElementById("insruction")
//         msg.innerHTML = "Please enter a single letter";
//     }

//     else { 
//         for (var j = 0; j < guessingWord.length; j++) {
//             if (guessingWord[j] === guess) {
//                 guessingArray[j] = guess;
//                 numOfGuessesLeft--;
//             }
//         }
//     }

//Still to do

// if (guessingWord === guessingArray.toString()) {
//     // ..add to the win counter & give the user an alert.
//     wins++;
//     alert("You win!");
//   var x =  document.getElementById("myAudio")
        //function playAudio() {
//          x.play();
        //}

// Update "tally" div within html
//      document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>";

//determine how to start a new round of play without zeroing out tally of wins and losses.

