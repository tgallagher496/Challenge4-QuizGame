const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const currentScore = document.querySelector(".currentscore");
var timeEl = document.querySelector(".time");
var secondsLeft = 50;

var score = 0;


const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQusetionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function startGame() {
    startButton.classList.add("hide");
    setTime();
        shuffledQuestions = questions.sort(() => Math.random() - 0.5);
        currentQuestionIndex = 0;
        questionContainerElement.classList.remove("hide");
        setNextQuestion();
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach((button) => {
        setStatusClass(button, button.dataset.correct);
    });
    console.log(selectedButton.classList.value);
    if(selectedButton.classList.value === "btn wrong"){
        secondsLeft = secondsLeft-10;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        score = secondsLeft;
        timeEl.textContent = "Game Over";
        currentScore.textContent = "Your current score is " + score;
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        nextButton.classList.add("hide");
       timeEl.classList.add("hide");

    }
  
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left.";
  
      if(secondsLeft <= 0) {
        // Stops execution of action at set interval
        score = 0;
        clearInterval(timerInterval);
        timeEl.textContent = "Game Over";
        currentScore.textContent = "Your current score is " + score;
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        nextButton.classList.add("hide");
        secondsLeft = 50;
      }
  
    }, 1000);
  }

const questions = [
    {
        question: "What is 2+2",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false },
            { text: "10", correct: false },
            { text: "12", correct: false },
        ],
    },
    {
        question: "What is 4+2",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: false },
            { text: "6", correct: true },
            { text: "12", correct: false },
        ],
    },
    {
        question: "What is 2*5",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: false },
            { text: "10", correct: true },
            { text: "12", correct: false },
        ],
    },
    {
        question: "What is 8*5",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: false },
            { text: "40", correct: true },
            { text: "12", correct: false },
        ],
    },

    {
        question: "What is 3*5",
        answers: [
            { text: "4", correct: false },
            { text: "22", correct: false },
            { text: "10", correct: false },
            { text: "15", correct: true },
        ],
    },
];
