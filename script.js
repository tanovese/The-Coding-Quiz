const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");
const questionsEl= document.getElementById("question-here");
const answerButtonsEl = document.getElementById("answer-buttons");
const r = document.getElementById("result");
const endDisplay = document.getElementById("end-of-quiz-container");
var timeLeft= document.getElementById('time');
var clock= 30;

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
    revealQuestions(randomQuestions[currentQuestionIndex])
    // if(currentQuestionIndex === randomQuestions.length) {
    //     optionsContainer.setAttribute("style", "display:none");
    //     r.setAttribute("style", "display:none");
    //     endDisplay.setAttribute("style", "display:block");
    // }
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
        } else {
        r.setAttribute("style", "display:block");
        r.innerHTML="Incorrect";
        r.style.color="brown";
        clock -= 10
        timeLeft.style.color="brown";
        }
        currentQuestionIndex++
        setNextQuestion();
        
    //     deductTime(); // <- have to fix function. It only works one time. setAttributes dont work.
    // //     reduceScore(); // <- have to define function
    }

// function answerWrong();


// function deductTime() {
//     timeLeft - 10
//     timeLeft.style.color="brown";
// }

// Our function for time remaining //
function timeLeftClock() {
    //Set interval

    var interval= setInterval(function () {
        clock --;
        timeLeft.textContent = "TIME REMAINING: " + clock;
        if (clock === 0) {
          clearInterval(interval)
            optionsContainer.setAttribute("style", "display:none");
            r.setAttribute("style", "display:none");
            endDisplay.setAttribute("style", "display:block");
            return
        }
    }, 1000);
}

// The Questions to be asked //
const questions= [
    {
        q: "What is my favorite fruit?",
        a: [
            { text: "Apple", correct: true},
            { text: "Banana", correct: false},
            { text: "Orange", correct: false}
        ]
    },
    {
        q: "What is my favorite color?",
        a: [
            { text: "Pink", correct: false},
            { text: "Turquiose", correct: false},
            { text: "Purple", correct: true},
        ]
    },
    {
        q: "What is my favorite pet?",
        a: [
            { text: "Dog", correct: false},
            { text: "Dog & Cat", correct: true},
            { text: "Rabbit", correct: false},
        ]
    },
    {
        q: "What is my favorite holiday?",
        a: [
            { text: "Halloween", correct: false},
            { text: "The 4th of July", correct: false},
            { text: "Christmas", correct: true}
        ]
    }
]