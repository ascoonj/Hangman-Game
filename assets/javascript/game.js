//Declaring and initialising values of Globally accessible variables----------------------------------------------------------------------------

// Counts to keep track of # of guesses, wins and losses
var numOfGuessesLeft = 8;
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
var guessingWord = "";

//The guessing array of empty letter holders to accept player's guesses
var guessingArray = [];

//Running list of incorrect guesses
var wrongGuesses = [];



// Function to start a new game -----------------------------------------------------------------------------------------------------------------

function newGame() {
    numOfGuessesLeft = 8;

    guessingArray = [];

    guessingWord = wordList[Math.floor(Math.random() * wordList.length)];
    console.log(guessingWord);

    wrongGuesses = [];

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

//newGame();
// Function to determine how to handle the key the user pressed---------------------------------------------------------------------------------

function evaluateGuess(anyLetter) {

    var guessLetterInWord = false;
    
    if (anyLetter.length > 1) {
        alert("Please enter a single letter");
    } else if (anyLetter.length === 1) {
        for (j = 0; j < guessingArray.length; j++) {
            if (guessingWord[j] === anyLetter) {
                guessingArray[j] = anyLetter;
                guessLetterInWord = true;
            } 
        }
        //console.log("Guess Letter in Word: " +  guessLetterInWord);
        document.getElementById("right-guesses").innerHTML = guessingArray.join(" ");
    }
        //console.log("index of guess in wrongGuesses: " + wrongGuesses.indexOf(anyLetter));
        //console.log("index of guess in guessingWord: " + guessingWord.indexOf(anyLetter));
        //console.log("guessLetterInWord = " + guessLetterInWord);

    if ((guessLetterInWord === false) && (wrongGuesses.indexOf(anyLetter) === -1)) {
        console.log(wrongGuesses.indexOf(anyLetter));
        console.log("Ayanna");

        wrongGuesses.push(anyLetter.toUpperCase());
        console.log(wrongGuesses);
        numOfGuessesLeft--;
        document.getElementById("wrong-guesses").innerHTML = "Incorrect Guesses: <br>" + wrongGuesses.join(" ");
        document.getElementById("guess-counter").innerHTML = "<p> Guesses remaining: <br>" + numOfGuessesLeft + "</p>";
    }
};



// Function to determine if player wins or loses-----------------------------------------------------------------------------------------------------

function tallyScores() {

    var x = document.getElementById("myAudio");

    console.log(guessingWord);
    console.log(guessingArray.join(""));
    console.log(guessingWord.split(""));
    console.log(guessingArray);

    //if (guessingWord === guessingArray.toString()) { -- alternative win condition
    if ((guessingWord.split("")) == guessingArray) {
        console.log("true");
        wins++;
        x.play();
        alert("You win!");
        document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>";
    } else if (numOfGuessesLeft === 0) {
        losses++;
        document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>";
    }

};

//------WHERE/ HOW THE MAGIC HAPPENS--------------------------------------------------------------------------------------------------------------------
// Game process is triggered by user key release--------------------------------------------------------------------------------------------------------
newGame();
document.onkeyup = function (event) {
    
        var guessCode = event.keycode;
        var guessLetter = event.key.toLowerCase();
        //newGame();
    
        if ((guessCode <= 64) || (guessCode >= 91)) {
            alert("Please enter letters only");
        } else {
            //  newGame();
            evaluateGuess(guessLetter);
    
        }
    
        tallyScores();
        //newGame();
    };
//----------------------------------------------------------------------------------------------------------------------------------------------------------

//still to do:
// 1.) Determine how to start a new round of play without zeroing out tally of wins and losses.
//      I.e. where to appropriately call the function newGame() to have the game restart after a round of play
// 2.) Assess whether event.keycode is within the range for letters within the evaluateGuess() function instead of within the event function
// 3.) Determine why the wrong guesses is duplicating a letter if pressed repeatedly

