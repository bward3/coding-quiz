var quizContainer = document.getElementById("container");
var timerEl = document.getElementById("timer");
var questionNum = 0;
var gameOver = false;
var currentScore = 0;
var secondsLeft = 20;

var questions = [
    ["What is my favorite color?", 0],
    ["What is the airspeed velocity of an unladen swallow?", 3],
    ["What is the capital of Turkey?", 0],
    ["Where is the Taj Mahal located?", 0]
]

var answers = [
    ["Blue", "Green", "Yellow", "Orange"],
    ["25mph", "100m/s", "45mph", "Is it a European or African swallow?"],
    ["Istanbul", "Madrid", "Athens", "Constantinople"],
    ["Agra", "Nagpur", "Kolkata", "Mumbai"]
]

init();

function init() {
    var beginEl = document.createElement("h1");
    beginEl.textContent = "Press button to start quiz.";
    var startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.addEventListener("click", nextQuestion);
    quizContainer.append(beginEl);
    quizContainer.append(startBtn);
}

function nextQuestion() {
    if (questionNum < questions.length) {
        quizContainer.innerHTML = "";
        createQuestion(questionNum);
        questionNum++;
    } else {
        gameOver();
    }
}

function gameOver() {
    
}

function startTimer() {
    
    var timer = setInterval(function() {
        timerEl.textContent = secondsLeft;
        secondsLeft--;
    });
}

function createQuestion(num) {
    //insert question to container div
    var questionText = questions[num][0];
    var correctAnswer = questions[num][1];
    var answerList = answers[num];
    var questionEl = document.createElement("h1");
    questionEl.textContent = questionText;
    quizContainer.append(questionEl);

    var buttonList = document.createElement("ul");
    //generate answer buttons
    for (i = 0; i < answerList.length; i++) {
        var answerBtn = document.createElement("button");
        var listItem = document.createElement("li");
        answerBtn.textContent = (i + 1) + ". " + answers[num][i];
        answerBtn.setAttribute("id", "btn" + i);
        if (i === correctAnswer) {
            answerBtn.setAttribute("data-correct", "true");
        } else {
            answerBtn.setAttribute("data-correct", "false")
        }
        answerBtn.addEventListener("click", checkAnswer);
        listItem.append(answerBtn);
        buttonList.append(listItem);
    }
    quizContainer.append(buttonList);
}

function checkAnswer(event) {
    event.preventDefault();
    var answerEl = document.createElement("div");
    var btnClicked = event.target;
    var isCorrect = btnClicked.getAttribute("data-correct");
    if (isCorrect === "true") {
        currentScore += 5;
        answerEl.textContent = "Correct!\aCurrent score: " + currentScore;
    } else {
        answerEl.textContent = "Incorrect!";
    }
    nextQuestion();
    quizContainer.append(answerEl);
}