const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
console.log(choices);

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];




let questions = [
{
    question: "What is 2x2?",
    choice1: "4",
    choice2: "3",
    choice3:  "1",
    choice4: "0",
    answer: 1
},
{
    question: "What is 4x4",
    choice1: "4",
    choice2: "3",
    choice3:  "1",
    choice4: "16",
    answer: 4
},

{
    question: "What is 0x3?",
    choice1: "4",
    choice2: "0",
    choice3:  "1",
    choice4: "3",
    answer: 4
}

];

const correct_bonus = 10;
const max_questions = 3;

function startGame()
{
    questioncounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();

};

function getNewQuestion()
{
questionCounter++;
const questionIndex = Math.floor(Math.random()*availableQuestions.length);
currentQuestion = availableQuestions[questionIndex];
question.innerHTML = currentQuestion.question;

choices.forEach(choice)
{
const number = choice.dataset['number'];
choice.innerHTML = currentQuestion['choice'+number];
};


}

startGame();