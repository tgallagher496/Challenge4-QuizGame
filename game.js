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
    secondsLeft = 50;
    currentScore.classList.add("hide");
    startButton.classList.add("hide");
    nextButton.classList.remove("hide");
    setTime();
    timeEl.classList.remove("hide")
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
    if (selectedButton.classList.value === "btn wrong") {
        secondsLeft = secondsLeft - 10;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
        score = secondsLeft;
        currentScore.textContent = "Your current score is " + score;
        startButton.classList.remove("hide");
        nextButton.classList.add("hide");
        timeEl.classList.add("hide");
        startButton.addEventListener("click", startGame);
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
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft + " seconds left.";

        if (secondsLeft <= 0) {
            // Stops execution of action at set interval
            score = 0;
            clearInterval(timerInterval);
            currentScore.classList.remove("hide");
            currentScore.textContent = "Game Over:  Your current score is " + score;
            startButton.innerText = "Restart";
            startButton.classList.remove("hide");
            nextButton.classList.add("hide");
            timeEl.classList.add("hide");
            secondsLeft = 50;

        }

    }, 1000);
}

const questions = [
    {
        question: "How do you link the JavaScript file into HTML?",
        answers: [
            { text: "<script>", correct: true },
            { text: "<html>", correct: false },
            { text: "<JavaScript>", correct: false },
            { text: "<link>", correct: false },
        ],
    },
    {
        question: "How do you use an alert box to write 'Hello!'?",
        answers: [
            { text: "message('Hello!');", correct: false },
            { text: "txt('Hello!');", correct: false },
            { text: "alert('Hello!');", correct: true },
            { text: "'Hello!';", correct: false },
        ],
    },
    {
        question: "What does a function look like in JavaScript when created?",
        answers: [
            { text: "startGame", correct: false },
            { text: "function.startGame()", correct: false },
            { text: "function startGame()", correct: true },
            { text: "startGame()", correct: false },
        ],
    },
    {
        question: "What do comments look like in JavaScript?",
        answers: [
            { text: "Comment", correct: false },
            { text: "<!--  -->", correct: false },
            { text: "//", correct: true },
            { text: "'This is a comment.", correct: false },
        ],
    },

    {
        question: "Is JavaScript the same as Java?",
        answers: [
            { text: "Yes", correct: false },
            { text: "No", correct: true },
        ],
    },
];
