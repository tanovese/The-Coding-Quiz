const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");

const questionEl= document.getElementById("question-here");
const choiceButton = document.querySelector(".choices");

let randomQuestions, currentQuestionIndex

beginButton.addEventListener("click", beginGame);

function beginGame() {
    quizContainer.setAttribute("style", "display:none");
    timeLeftClock();
    randomQuestions= questions.sort(() => Math.random() - .5)
    currentQuestionIndex= 0;
    optionsContainer.setAttribute("style", "display:block");
    beginNextQuestion();
}

function beginNextQuestion() {
    resetState()
    revealQuestion(randomQuestions[currentQuestionIndex])
}

function revealQuestion(q) {
    questionEl.innerText=q.q
    q.a.forEach(a => {
        const selectButton = document.createElement("select-button")
        selectButton.innerText=a.text
        selectButton.classList.add("choices")
        if (a.correct) {
            selectButton.dataset.correct = a.correct
        }
        selectButton.addEventListener("click", selectChoice)
        choiceButton.appendChild(selectButton);
    })
}

function resetState() {
    
}

function selectChoice(e) {

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
var questions= [
    {
        q: "What is my favorite fruit?",
        a: [{ text: "Apple", isAnswer: true },
            { text: "Banana", isAnswer: false},
            { text: "Orange", isAnswer: false}
        ]

    },
    {
        q: "What is my favorite color?",
        a: [{text: "Purple", isAnswer: false},
            {text: "Turquiose", isAnswer: false},
            {text: "Pink", isAnswer: false},
            {text: "ALL of the above", isAnswer: true}
        ]

    },
    {
        q: "What is my favorite pet?",
        a: [{text: "Dog", isAnswer: false},
            {text: "Dog & Cat", isAnswer: true},
            {text: "Cat", isAnswer: false},
            {text: "Rabbit", isAnswer: false},
            
    ]
    },
    {
        q: "What is my favorite holiday?",
        a: [{text: "Halloween", isAnswer: false},
            {text: "The 4th of July", isAnswer: false},
            {text: "Christmas", isAnswer: true},
            {text: "New Year's Eve", isAnswer: false}
    ]
    }
]

// let score = 0;

// function beginQuiz() {
//     currentQuestIndex= 0;
//     score= 0;
// }

// function revealQuestions() {

//     let currentQuest = quizQuestions[currentQuestIndex];
//     let questionQueue= currentQuestIndex + 1;
//     questionsEl.innerHTML= questionQueue + ". " + currentQuest.q;

//     currentQuest.a.forEach(answer=> {
//         const button = document.createElement("button");
//         button.innerHTML = answer.text;
//         button.classList.add("choice");
//         optionsEl.appendChild(button);
//     });
// }

// beginQuiz();