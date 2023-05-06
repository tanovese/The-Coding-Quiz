var timeLeft= document.getElementById('time')

const button = document.getElementById("start-button");
const quiz = document.getElementById("quiz-container");

button.addEventListener("click", timeLeftClock);

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

    quiz.textContent="Question # 1: TESTING"

}

var quizQuestions= [
    {
        question: "What is my favorite fruit?",
        answers: {
            a: "Apple",
            b: "Banana",
            c: "Orange"
        },
        correctAnswer: "a"
    },
    {
        question: "What is my favorite color?",
        answers: {
            a: "Purple",
            b: "Turquoise",
            c: "Pink",
            d: "ALL of the above"
        },
        correctAnswer: "d"
    },
    {
        question: "What is my favorite pet?",
        answers: {
            a: "Dog",
            b: "Cat",
            c: "Rabbit",
            d: "Dog & Cat"
        },
        correctAnswer: "d"
    },
]