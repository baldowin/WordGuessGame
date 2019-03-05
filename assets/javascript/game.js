window.onload=function(){
var guessLeft;
var letters;
var wordsToGuess=["FJORD","RHYTHM","HURRICANE","REVOLUTION"]
var currentWord;
var guessingWord;
var count;
var win=0;
var loss=0;
var wordText= document.getElementById("word");
var guessText=document.getElementById("guessCount");
var letterText=document.getElementById("letters");
var winText=document.getElementById("win");
var lossText=document.getElementById("loss");

function newWord(){
    var word=wordsToGuess[Math.floor(Math.random()*wordsToGuess.length)];
    if (word===currentWord)
        return newWord();
    return word;
}

function arrToString(arr){
    out="";
    arr.forEach(function(part){
        out+=part;
    });
    return out;
}   

function reset(){
    count=0;
    guessLeft=7;
    currentWord=newWord();
    letters=[];
    guessingWord=[];
    for (var i=0;i<currentWord.length;i++){
        guessingWord.push(" _ ");
    }
    guessText.textContent=guessLeft;
    wordText.textContent=arrToString(guessingWord);
    letterText.textContent=letters;
    winText.textContent=win;
    lossText.textContent=loss;
}

document.onkeyup=function(event){
    if (event.keyCode>=65&&event.keyCode<=90){
    var guess=event.key.toUpperCase();
    if(letters.indexOf(guess)!=-1){//check if letter has been guessed
        alert("This Letter has already been guessed");
        return;
    }
    if (currentWord.indexOf(guess)==-1) {
        guessLeft--;
        guessText.textContent=guessLeft;
        if(guessLeft==0){
            loss++;
            alert("YOU LOSE");
            reset();
            return;
        }
    }
    else{
        for(var i =0; i<currentWord.length;i++){
            if (currentWord[i]==guess){
            currentWord[i]="-";
            guessingWord[i]=" "+guess+" ";
            count++;
            }
        }
        wordText.textContent=arrToString(guessingWord);
        if (count==currentWord.length){
            win++;
            alert("YOU WIN!");        
            reset();
            return;
        }
        
    }
    letters.push(guess);
    letterText.textContent=letters;
}

}
document.getElementById("reset").onclick = function(){
    win=0;
    loss=0;
    reset();
}
reset();
}