var quizContainer = document.getElementById("container");
var timerEl = document.getElementById("timer");
var questionNum;
var currentScore;
var secondsLeft;
var gameOn = false;
const HISCORE_MAX = 10
const SCORE_KEY = 'highScores';

var questions = [
    ["What is my favorite color?", 0],
    ["What is the airspeed velocity of an unladen swallow?", 3],
    ["What is the capital of Turkey?", 0],
    ["Where is the Taj Mahal located?", 0],

    ["Inside which HTML element do we put the JavaScript?", 3],
    ["What is the correct syntax for referring to an external script called \"xxx.js\"?", ]



]

var answers = [
    ["Blue", "Green", "Yellow", "Orange"],
    ["25mph", "100m/s", "45mph", "Is it a European or African swallow?"],
    ["Istanbul", "Madrid", "Athens", "Constantinople"],
    ["Agra", "Nagpur", "Kolkata", "Mumbai"],

    ["<scripting>", "<js>", "<code>", "<script>"],
    ["<script name=\"xxx.js\">", "<script src=\"xxx.js\">", "<script href=\"xxx.js\">", "<script id=\"xxx.js\">"]

    
]

init();

function init() {
    var beginEl = document.createElement("h1");
    beginEl.textContent = "Press button to start quiz.";
    var startBtn = document.createElement("button");
    startBtn.textContent = "Start";
    startBtn.addEventListener("click", startGame);
    startBtn.classList.add("start-btn");
    quizContainer.append(beginEl);
    quizContainer.append(startBtn);
}

function startGame() {
    gameOn = true;
    questionNum = 0;
    currentScore = 0;
    secondsLeft = 60;
    quizContainer.classList.remove("post-game");
    timerEl.textContent = "Time: " + secondsLeft;
    startTimer();
    nextQuestion();
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
        answerBtn.textContent = (i + 1) + ".  " + answers[num][i];
        answerBtn.setAttribute("id", "btn" + i);
        answerBtn.style.paddingLeft = ".75rem"
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
        answerEl.innerHTML = "<br>Correct!<br><br>Current score: " + currentScore;
    } else {
        answerEl.innerHTML = "<br>Incorrect!<br><br>Current score: " + currentScore;
    }
    nextQuestion();
    quizContainer.append(answerEl);
}


function gameOver() {
    quizContainer.innerHTML = "";
    timerEl.innerHTML = ""
    gameOn = false;
    questionNum=0;
    enterScore();
}

function enterScore() {
    var inputEl = document.createElement("input");
    var submitBtn = document.createElement("input");
    var promptDiv = document.createElement("div");
    submitBtn.addEventListener("click", submitEvent);
    inputEl.setAttribute("type", "text");
    inputEl.setAttribute("id", "player-id");
    submitBtn.setAttribute("type", "submit");
    promptDiv.innerHTML = "<p>Type your initials to save your score</p>";
    quizContainer.append(promptDiv);
    quizContainer.append(inputEl);
    quizContainer.append(submitBtn);
}

function submitEvent(event) {
    event.preventDefault();
    var inputEl = document.getElementById("player-id");
    playerName = inputEl.value;
    checkHighScores(currentScore);
}

function checkHighScores(score) {
    const HISCORE_STRING = localStorage.getItem(SCORE_KEY);
    const SCORES = JSON.parse(HISCORE_STRING) ?? []; //set str to empty array if null
    const LOWEST_SCORE = SCORES[HISCORE_MAX - 1]?.score ?? 0; //set lowest score to empty if 

    if (score > LOWEST_SCORE) {
        saveHighScore(score, playerName, SCORES);
    } else {
        drawScores();
    }
}

function saveHighScore(score, name, scoreList) {
    const newScore = { score, name };
    scoreList.push(newScore);
    scoreList.sort((a, b) => b.score - a.score);
    scoreList.splice(HISCORE_MAX);
    localStorage.setItem(SCORE_KEY, JSON.stringify(scoreList));
    drawScores();
}

function drawScores() {
    quizContainer.classList.add("post-game");
    quizContainer.innerHTML = "";
    var questionEl = document.createElement("h1");
    var scoreList = document.createElement("ol");
    questionEl.textContent = "HIGH SCORES";
    const SCORES = JSON.parse(localStorage.getItem(SCORE_KEY)) ?? [];
    console.log(SCORES);
    scoreList.innerHTML = SCORES.map(
        (pair) => `<li>${pair.score} - ${pair.name.toUpperCase()}</li>`
    ).join('');
    newGameBtn = document.createElement("button");
    clearScoresBtn = document.createElement("button");
    newGameBtn.textContent = "New Game";
    clearScoresBtn.textContent = "Clear High Scores";
    quizContainer.append(questionEl);
    quizContainer.append(scoreList);
    quizContainer.append(newGameBtn);
    quizContainer.append(clearScoresBtn);
    newGameBtn.addEventListener("click", startGame);
    clearScoresBtn.addEventListener("click", clearScores);
}

function clearScores() {
    localStorage.clear();
    drawScores();
}