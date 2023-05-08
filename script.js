const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");
const questionsEl= document.getElementById("question-here");
const answerButtonsEl = document.getElementById("answer-buttons");
const r = document.getElementById("result");

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
}

function resetState() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild)
    }
}

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

answerButtonsEl.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion();
})

function selectChoice(e) {
    const selectedButton= e.target
    const correct= selectedButton.dataset.correct
    Array.from(answerButtonsEl.children).forEach(button => {
    })
    checkTrue()
}

function checkTrue() {
    if(questions[1][0] === true) {
    r.setAttribute("style", "display:block");
    r.innerHTML="Correct";
    } else {
    r.setAttribute("style", "display:block");
    r.innerHTML="Incorrect";
    }
}

var timeLeft= document.getElementById('time')

// Our function for time remaining //
function timeLeftClock() {
        var clock= 100;

    //Set interval

    var interval= setInterval(function () {
        clock --;
        timeLeft.textContent = "TIME REMAINING: " + clock;
        if (clock === 0) {
          clearInterval(interval)
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