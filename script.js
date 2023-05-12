const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");
const questionsEl= document.getElementById("question-here");
const answerButtonsEl = document.getElementById("answer-buttons");
const r = document.getElementById("result");
const endDisplay = document.getElementById("end-of-quiz-container");
var timeLeft= document.getElementById('time');
var clock= 60;
const currentScore = document.getElementById("score");
const highScorePts= document.getElementById("high-score");
let score= 0;
let highScore=0;
const saveButton= document.getElementById("save-button");
const highScoresContainer = document.getElementById("high-scores-container");
const highScoreHeader = document.getElementById("high-scores-header");
const restart = document.getElementById("restart-button");
// highScorePts.innerHTML=localStorage.getItem("highscoreValue");
// currentScore.innerHTML=localStorage.getItem("scoreValue");
const emojiFace= document.getElementById("emoji");


//begin button
beginButton.addEventListener("click", beginGame);

//function to begin after pressing begin
function beginGame() {
    quizContainer.setAttribute("style", "display:none");
    timeLeftClock();
    optionsContainer.setAttribute("style", "display:block");
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion();
}

//set next Q
function setNextQuestion() {
    resetState()
    if(currentQuestionIndex < 4) {
        revealQuestions(randomQuestions[currentQuestionIndex])
    }
}

//reset
function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

//reveal questions onto the screen
function revealQuestions(q) {
    questionsEl.innerText= q.q
    q.a.forEach(a=> {
        const buttonSelect = document.createElement("button")
        buttonSelect.innerText=a.text
        buttonSelect.classList.add("choices");
        if(a.correct) {
            buttonSelect.dataset.correct=a.correct
        }
        buttonSelect.addEventListener("click", selectChoice)
        answerButtonsEl.appendChild(buttonSelect)
    })
}

//select choice function with defining how a correct answer is selected
//if statements to define what happens if a user selects correct or incorrect
function selectChoice(e) {
    console.log("selectChoice", e)
    console.log(e.srcElement.textContent)
    let answer = false;
    var answers = questions[currentQuestionIndex].a;
for (let i=0; i < answers.length; i ++) {
    if( answers[i].text === e.srcElement.textContent) {
       answer= answers[i].correct;
    }
}
//if the user selects correct answer now we are going to let them know
//if not we will also let them know
console.log(answer)
    if(answer === true) {
        r.setAttribute("style", "display:block");
        r.innerHTML="Correct!";
        r.style.color="darkgreen";
        timeLeft.style.color="darkgreen";
        emojiFace.textContent="😄";
        scorePoints();
        } else {
        r.setAttribute("style", "display:block");
        r.innerHTML="Incorrect";
        r.style.color="brown";
        clock -= 10
        timeLeft.style.color="brown";
        emojiFace.textContent="😑";
        }
        currentQuestionIndex++
        setNextQuestion();
    }

    //score points function increases score 100 pts if user selects correct
    //also stores that score in local storage
function scorePoints() {
    score += 100;
    currentScore.textContent= "SCORE POINTS: " + score;
    localStorage.setItem('scoreValue', score);

    // if (score < highScore) {
    //     highScore=score;
    //     highScorePts.textContent= "HIGH SCORE: " + 100;
    //     localStorage.setItem('highscoreValue', highScore);
    // }
}

//upon save, the initials input and score input are stored
saveButton.addEventListener("click", storeInput);

//store input function which stores input and also prevents the default
//the prevent default prevents the page to auto reload when the user clicks save
function storeInput(event) {
    event.preventDefault();

    const initialsInput= document.getElementById("initials-input");
    const scoreInput =document.getElementById("score-input");
    // localStorage.setItem('initialsInputValue', JSON.stringify(initialsInput.value));
    // localStorage.setItem('scoreInputValue', JSON.stringify(scoreInput.value));

    let newInput=JSON.parse(window.localStorage.getItem('newInput')) || [];
    let Input= {
        enteredScore: scoreInput.value,
        enteredInitials: initialsInput.value,
    };

    newInput.push(Input);
    window.localStorage.setItem('newInput', JSON.stringify(newInput));

    renderInput();
}

//render input function puts user input into the list items
function renderInput() {
    // var lastInitialsInput = JSON.parse(localStorage.getItem('initialsInputValue'));
    var storedInputs = JSON.parse(localStorage.getItem('newInput'));
    // var lastScoreInput = JSON.parse(localStorage.getItem('scoreInputValue'));
    console.log(storedInputs);
    const userList= document.querySelector(".user-inputs");
    // userList.textContent= localStorage.getItem('newInput');
    for (let index = 0; index < storedInputs.length; index++) {
        const storedInputIndex = storedInputs[index];
        var div=document.createElement("div");
        div.style.backgroundColor="whitesmoke";
        div.textContent = storedInputIndex.enteredScore + " , " + storedInputIndex.enteredInitials;

        userList.append(div);
    }
    
    // highScoreList.textContent=lastScoreInput || localStorage.getItem('scoreValue');
    // showHighScores();
    endDisplay.setAttribute("style", "display:none");
    highScoresContainer.setAttribute("style", "display:block");
}


//now we need to create a variable for the clear button so that it can be used
//for an event listener
var clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", clearStorage);

//now we have the clearStorage function which will clear the user inputs
function clearStorage() {
    localStorage.clear();
    const userList= document.querySelector(".user-inputs");
    userList.setAttribute("style", "font-size: 40px");
    userList.textContent= "😳";
}

//upon clicking the highscores tab, the showHighScores function runs
// highScoreHeader.addEventListener("click", showHighScores);

//showHighScores sets quiz container attribute to none, endDisplay to none and
//then shows the highScoresContainer by setting display to block
// function showHighScores() {
//     quizContainer.setAttribute("style", "display:none");
//     endDisplay.setAttribute("style", "display:none");
//     highScoresContainer.setAttribute("style", "display:block");
// }

//upon selecting restart on the high scores page we are taken back to the quiz container
restart.addEventListener("click", showQuizContainer);

//highScoresContainer is set to display none and quizContainer set to display
//so that we can choose to begin the challenge again
function showQuizContainer() {
    window.location.href = window.location.href;
    highScoresContainer.setAttribute("style", "display:none");
    quizContainer.setAttribute("style", "display:block");
}

// Our function for time remaining //
function timeLeftClock() {
    //Set interval
    var interval= setInterval(function () {
        clock --;
        timeLeft.textContent = "TIME REMAINING: " + clock;
        if (clock === 0 || currentQuestionIndex > 3) {
          clearInterval(interval)
            r.setAttribute("style", "display:none");
            optionsContainer.setAttribute("style", "display:none");
            endDisplay.setAttribute("style", "display:block");
            return;
        }
    }, 1000);
}

// The Questions to be asked //
const questions= [
    {
        q: "What is the DOM?",
        a: [
            { text: "A. The document object model", correct: true},
            { text: "B. The data opportunity method", correct: false},
            { text: "C. data object mode", correct: false}
        ]
    },
    {
        q: "What is a function?",
        a: [
            { text: "A. Code that performs based on conditions of 'if' statements", correct: false},
            { text: "B. A value that can change", correct: false},
            { text: "C. A 'self contained' block of code which accomplishes a specific task", correct: true},
        ]
    },
    {
        q: "What is an array?",
        a: [
            { text: "A. A result with two possible values, true or false", correct: false},
            { text: "B. A collection of stored data, referenced by index", correct: true},
            { text: "C. A sequence of characters which represent text", correct: false},
        ]
    },
    {
        q: "In HTML, where is the JavaScript 'src' inserted?",
        a: [
            { text: "A. Anywhere above the body element", correct: false},
            { text: "B. Between <head> and </head> tags", correct: false},
            { text: "C. Between <script> and </script> tags", correct: true}
        ]
    }
]