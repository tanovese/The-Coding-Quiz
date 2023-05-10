const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");
const questionsEl= document.getElementById("question-here");
const answerButtonsEl = document.getElementById("answer-buttons");
const r = document.getElementById("result");
const endDisplay = document.getElementById("end-of-quiz-container");
var timeLeft= document.getElementById('time');
var clock= 100;
const currentScore = document.getElementById("score");
const highScorePts= document.getElementById("high-score");
let score= 0;
let highScore=0;
const initialsInput= document.getElementById("initials-input");
const scoreInput =document.getElementById("score-input");
const initialsList= document.querySelector("initials-list");
const highScoreList= document.querySelector("high-scores-list");
const saveButton= document.getElementById("save-button");
const highScoresContainer = document.getElementById("high-scores-container");
// initialsList.innerHTML=localStorage.getItem("initialsInputValue");
// highScoreList.innerHTML=localStorage.getItem('scoreInputValue');
// highScorePts.innerHTML=localStorage.getItem("highscoreValue");
// currentScore.innerHTML=localStorage.getItem("scoreValue");


beginButton.addEventListener("click", beginGame);

function beginGame() {
    quizContainer.setAttribute("style", "display:none");
    timeLeftClock();
    optionsContainer.setAttribute("style", "display:block");
    randomQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    setNextQuestion();
}

function setNextQuestion() {
    resetState()
    if(currentQuestionIndex < 4) {
        revealQuestions(randomQuestions[currentQuestionIndex])
    }
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

function revealQuestions(q) {
    questionsEl.innerText= q.q //<- is there a way to access the array differently here? Producing an error.
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
console.log(answer)
    if(answer === true) {
        r.setAttribute("style", "display:block");
        r.innerHTML="Correct!"
        r.style.color="darkolivegreen";
        timeLeft.style.color="darkolivegreen";
        scorePoints();
        } else {
        r.setAttribute("style", "display:block");
        r.innerHTML="Incorrect";
        r.style.color="brown";
        clock -= 10
        timeLeft.style.color="brown";
        }
        currentQuestionIndex++
        setNextQuestion();
    }

function scorePoints() {
    score += 100;
    currentScore.textContent= "SCORE POINTS: " + score;
    // if (highScore > score) {
    //     highScore=score;
    //     highScore.textContent= "HIGH SCORE: " + highScore;
    // }
    // scoreStorage();
}

// function scoreStorage() {
//     localStorage.setItem('scoreValue', score);

//     localStorage.setItem('highscoreValue', highscore);
// }

// saveButton.addEventListener("click", inputStorage);

// function inputStorage() {
//     localStorage.setItem('initialsInputValue', initialsInput.value);

//     localStorage.setItem('scoreInputValue', scoreInput.value);

//     endDisplay.setAttribute("style", "display:none");
//     highScoresContainer.setAttribute("style", "display:block");
// }

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
        q: "What is my favorite fruit?",
        a: [
            { text: "A. Apple", correct: true},
            { text: "B. Banana", correct: false},
            { text: "C. Orange", correct: false}
        ]
    },
    {
        q: "What is my favorite color?",
        a: [
            { text: "A. Pink", correct: false},
            { text: "B. Turquiose", correct: false},
            { text: "C. Purple", correct: true},
        ]
    },
    {
        q: "What is my favorite pet?",
        a: [
            { text: "A. Dog", correct: false},
            { text: "B. Dog & Cat", correct: true},
            { text: "C. Rabbit", correct: false},
        ]
    },
    {
        q: "What is my favorite holiday?",
        a: [
            { text: "A. Halloween", correct: false},
            { text: "B. The 4th of July", correct: false},
            { text: "C. Christmas", correct: true}
        ]
    }
]