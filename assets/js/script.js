var quizContainer = document.getElementById("container");
var timerEl = document.getElementById("timer");
var questionNum = 0;
var currentScore = 0;
var secondsLeft = 20;
var gameOn = false;

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
    startBtn.addEventListener("click", startGame);
    quizContainer.append(beginEl);
    quizContainer.append(startBtn);
}

function startGame() {
    timerEl.textContent = "Time: " + secondsLeft;
    startTimer();
    nextQuestion();
    gameOn = true;
}

function startTimer() {

    var timer = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft == 0 || gameOn === false) {
            clearInterval(timer);
            gameOver();
        }
    }, 1000);
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

function createQuestion(num) {
    //insert question to container div
    var questionText = questions[num][0];
    var correctAnswer = questions[num][1];
    var answerList = answers[num];
    var questionEl = document.createElement("h1");
    var buttonList = document.createElement("ul");

    questionEl.textContent = questionText;
    quizContainer.append(questionEl);

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
    answerEl.setAttribute("id", "correct-div");
    var btnClicked = event.target;
    var isCorrect = btnClicked.getAttribute("data-correct");
    if (isCorrect === "true") {
        currentScore += 5;
        answerEl.innerHTML = "Correct!<br><br>Current score: " + currentScore;
    } else {
        answerEl.textContent = "Incorrect!";
    }
    nextQuestion();
    quizContainer.append(answerEl);
}


function gameOver() {
    quizContainer.innerHTML = "";
    timerEl.innerHTML = ""
    gameOn = false;
    enterScore();
}

function enterScore() {
    quizContainer.classList.add("post-game")
    var inputEl = document.createElement("input");
    var submitBtn = document.createElement("input");
    var promptDiv = document.createElement("div");
    submitBtn.addEventListener("click", addScore);
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "player-id");
    submitBtn.setAttribute("type", "submit");
    promptDiv.innerHTML = "<p>Type your initials and hit Enter</p>";
    quizContainer.append(promptDiv);
    quizContainer.append(inputEl);
    quizContainer.append(submitBtn);
}

function addScore(event) {
    event.preventDefault();
    var inputEl = document.getElementById("player-id");
    playerName = inputEl.value;
    showScores(playerName);
}

function showScores(name) {
    quizContainer.innerHTML = "";
    console.log(name);
}