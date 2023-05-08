const beginButton = document.getElementById("begin-button");
const optionsContainer= document.getElementById("options-container");
const quizContainer= document.getElementById("quiz-container");

const questionEl= document.getElementById("question-here");
const choiceButton = document.querySelector(".choices");

// let randomQuestions, currentQuestionIndex

beginButton.addEventListener("click", beginGame);

function beginGame() {
    quizContainer.setAttribute("style", "display:none");
    timeLeftClock();
    randomQuestions= questions.sort(() => Math.random() - .5)
    currentQuestionIndex= 0;
    optionsContainer.setAttribute("style", "display:block");
    revealChoices();
}

// function beginNextQuestion() {
//     revealChoices(randomQuestions[currentQuestionIndex])
// }

choiceButton.addEventListener("click", checkTrue);

const q = document.getElementById("question-here");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const r = document.getElementById("result");

function nextQuestion() {
    q.innerHTML="What is my favorite color?";
    a.innerHTML= "Pink";
    b.innerHTML= "Turquoise";
    c.innerHTML= "Purple";
}

function checkTrue() {
    if(a === true) {
    r.setAttribute("style", "display:block");
    document.getElementById("result").innerHTML="Correct!";
    } else {
    r.setAttribute("style", "display:block");    
    document.getElementById("result").innerHTML = "Incorrect"    
    nextQuestion();
    }
}

function revealChoices() {
    q.innerHTML= "What is my favorite fruit?";
    a.innerHTML= "A. Apple";
    b.innerHTML= "B. Banana";
    c.innerHTML= "C. Orange";
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
        question: "What is my favorite fruit?",
        choiceA: "Apple",
        choiceB: "Banana",
        choiceC: "Orange",
        answer: "A"
    },
    {
        question: "What is my favorite color?",
        choiceA: "Pink",
        choiceB: "Turquiose",
        choiceC: "Purple",
        answer: "C"
    },
    {
        question: "What is my favorite pet?",
        choiceA: "Dog",
        choiceB: "Dog & Cat",
        chocieC: "Rabbit",
        answer: "B"
    },
    {
        question: "What is my favorite holiday?",
        choiceA: "Halloween",
        choiceB: "The 4th of July",
        choiceC: "Christmas",
        answer: "C"
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