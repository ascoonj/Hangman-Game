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

    //document.getElementById("win-or-lose").innerHTML = "<p></p>";


}

//newGame();
// Function to determine how to handle the key the user pressed---------------------------------------------------------------------------------

function evaluateGuess(anyLetter, letterCode) {
    document.getElementById("win-or-lose").innerHTML = "<p></p>";

    var guessLetterInWord = false;

    if ((letterCode <= 64) || (letterCode >= 91)) {
        var keyIsALetter = false;
        alert("Please press letter keys only");
    } else if (anyLetter.length > 1) {
        alert("Please enter a single letter");
    } else  if (anyLetter.length === 1) {
        for (j = 0; j < guessingArray.length; j++) { //for every guessed letter
            if (guessingWord[j] === anyLetter) {     //check to see if it is in the randomly selected word
                guessingArray[j] = anyLetter;        //update the guessing array to hold the correctly guessed letter in the spot it appears within the word
                guessLetterInWord = true;            //set guessLetterinWord to true
            }
        }
       //when the user guesses a letter in the guessing word, update the DOM to show the guess onscreen
        document.getElementById("right-guesses").innerHTML = guessingArray.join(" ");
    }
   

    if ((guessLetterInWord === false) && (wrongGuesses.indexOf(anyLetter) === -1)) { // if the guessed letter is not in the random word, and it is also not yet in the wrongGuesses list
        wrongGuesses.push(anyLetter.toUpperCase());  //add the incorrect guess to the wrongGuesses array
        numOfGuessesLeft--;                          //decrease the # of guesses counter by 1
        document.getElementById("wrong-guesses").innerHTML = "Incorrect Guesses: <br>" + wrongGuesses.join(" "); //update the DOM to reflect incorrectly guessed letters
        document.getElementById("guess-counter").innerHTML = "<p> Guesses remaining: <br>" + numOfGuessesLeft + "</p>";// update the DOM to reflect # of guesses now remaining
    }
};



// Function to determine if player wins or loses-----------------------------------------------------------------------------------------------------

function tallyScores() {

    var x = document.getElementById("myAudio"); //declare variable to access the DOM element containing/accessing the sound file
    
    //consoled values to ensure your win condition will evaluate to true in the right conditions
    console.log(guessingWord);
    console.log(guessingArray.join(""));
    

    //check to see if the letters appearing in the guessing array match the randomly chosen word to guess
    if (guessingWord === guessingArray.join("")) {
        wins++; //increase the wins counter by one
        x.play(); // play congratulatory island music :)
        document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>"; //Update # of wins in the DOM
        document.getElementById("win-or-lose").innerHTML = "<p> Awesome! You won!!! Press a letter to start guessing a new word!</p>";// Present winner message to player in the DOM
        newGame(); //Call the new game function

    } else if (numOfGuessesLeft === 0) { // if the word was not guessed, check that there are no guesses left - which means the player lost
        losses++; // increase the losses counter by one
        document.getElementById("tally").innerHTML = "<p>Wins: " + wins + "</p>" + "<p>Losses: " + losses + "</p>"; //Update # of losses in the DOM
        document.getElementById("win-or-lose").innerHTML = "<p> You lost :-(.  The word was '" + guessingWord + "'. Press a letter to try your hand at another word! </p>"; //Present losing message in the DOM
        newGame();// Call the new game function
    }

};

//------WHERE/ HOW THE MAGIC HAPPENS--------------------------------------------------------------------------------------------------------------------
// Game process is triggered by user key release--------------------------------------------------------------------------------------------------------
newGame(); 
document.onkeyup = function (event) {

    var guessCode = event.keycode;
    var guessLetter = event.key.toLowerCase();
  
    evaluateGuess(guessLetter, guessCode);

    tallyScores();
    
};
//----------------------------------------------------------------------------------------------------------------------------------------------------------

//For future update:

// 1.) Prevent the non-letter keys from being logged in the wrong guesses array.
// 2.) Determine why the wrong guesses array is duplicating a wrong guess if pressed repeatedly
