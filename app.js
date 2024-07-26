const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "A) Shark", correct: false },
            { text: "B) Blue whale", correct: true },
            { text: "C) Elephant", correct: false },
            { text: "D) Giraffe", correct: false },
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            { text: "A) Delhi", correct: true },
            { text: "B) Mumbai", correct: false },
            { text: "C) Bangalore", correct: false },
            { text: "D) Hyderabad", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "A) London", correct: false },
            { text: "B) Berlin", correct: false },
            { text: "C) Rome", correct: false },
            { text: "D) Paris", correct: true },
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "A) Mars", correct: true },
            { text: "B) Venus", correct: false },
            { text: "C) Jupiter", correct: false },
            { text: "D) Saturn", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById('time');
const scoreElement = document.getElementById('marks');

let currentQuestionIndex = 0;
let score = 0;
let timeleft;
let timeinterval;

function startTimer() {
    timeinterval = setInterval(function () {
        timeleft--;
        timerElement.textContent = timeleft;

        if (timeleft <= 0) {
            clearInterval(timeinterval);
            alert('Time is over');
            showScore();
        }
    }, 1000);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeleft = 40;
    nextButton.innerHTML = "Next &raquo;";
    nextButton.style.display = "block"; 
    scoreElement.textContent = `${score} / ${questions.length}`;
    startTimer();
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    
    if (currentQuestionIndex === questions.length - 1) {
        nextButton.innerHTML = "Submit";
    } else {
        nextButton.innerHTML = "Next &raquo;";
    }

    nextButton.disabled = true;
}

function resetState() {
    nextButton.style.display = "block";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true; 
    });
    scoreElement.textContent = `${score} / ${questions.length}`;
    nextButton.disabled = false; 
}

function showScore() {
    resetState();
    clearInterval(timeinterval);
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (nextButton.innerHTML === "Play Again") {
        startQuiz();
    } else if (nextButton.innerHTML === "Submit") {
        showScore();
    } else {
        handleNextButton();
    }
});

startQuiz();
