const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    console.log("Quiz Started");
    startButton.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove("hide");
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
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

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        startButton.innerText = "Restart";
        startButton.classList.remove("hide");
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

const questions = [
    {
        question: "What's 2 + 2?",
        answers: [
            { text: "4", correct: true },
            { text: "22", correct: false }
        ]
    },
    {
        question: "How's the best greeting?",
        answers: [
            { text: "Hiii there", correct: true },
            { text: "Yoww", correct: false },
            { text: "What's up?", correct: false },
            { text: "Hey", correct: false }
        ]
    },
    {
        question: "Is Javascript a good programming language to learn?",
        answers: [
            { text: "Yes, of course.", correct: false },
            { text: "I don't think so.", correct: false },
            { text: "Maybe, but there are many frameworks..", correct: true },
            { text: "I'm not sure.", correct: false }
        ]
    },
    {
        question: "Beer or Tea?",
        answers: [
            { text: "English Tea", correct: true },
            { text: "Beer, Gimme that alcohol", correct: false }
        ]
    },
    {
        question: "Did you like this app?",
        answers: [
            { text: "For sure, it's nice!", correct: true },
            { text: "Not too bad.", correct: false },
            { text: "It could be better.", correct: false },
        ]
    }
]