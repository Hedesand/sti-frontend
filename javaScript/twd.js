// element selectors
var scoreDisplay = document.querySelector("#custom-score");
var timerDisplay = document.querySelector("#custom-timer");
var titleDisplay = document.querySelector("#custom-header");
var startButton = document.querySelector("#start-button");
var questionDisplay = document.querySelector("#question-display");
var quizQuestion = document.querySelector("#quiz-question");
var answerOne = document.querySelector("#answer1");
var answerTwo = document.querySelector("#answer2");
var answerThree = document.querySelector("#answer3");
var answerFour = document.querySelector("#answer4");
var gameOverDisplay = document.querySelector("#game-over");
var gameOverOverlay = document.querySelector("#overlay-background");
var gameOverScore = document.querySelector("#game-over-score");
var gameOverSplash = document.querySelector("#game-over-splash");
var userNameForm = document.querySelector("#name-form");
var userName = document.querySelector("#userName");
var HighScoreList = document.querySelector("#score-list");
var dynamicList = document.querySelector("#dynamic-list");
var submitBtn = document.querySelector("#submit-btn");
var letsGoAgain = document.querySelector("#go-again");
var clearHighScores = document.querySelector("#clear-scores");
var retakeQuiz = document.querySelector("#retake-quiz");
var footer = document.querySelector("#footer");

var timerInterval; // make interval global
var currentTime = 60; //  start with a minute on the clock
var score = 0; // score start
var currentQuestion = 0; // keep adding to it to access others in the quiz Index
var scoreList = []; // empty score list

// question objects
var headquartersQ = {
  question: "The Sanctuary, which was the headquarters of the Saviors, was located in what abandoned facility?",
  answers: ["A Garbage Dump", "A Hospital", "A Prison", "A Factory"],
  correctAnswer: "A Factory",
};
var HilltopQ = {
  question: "In which state was the Hilltop located?",
  answers: ["Deleware", "Georgia", "Virginia", "California"],
  correctAnswer: "Virginia",
};
var flowersQ = {
  question: "The hand holding her gun trembled while she said, Just look at the flowers.",
  answers: ["Beth", "Lizzie", "Carol", "Maggie"],
  correctAnswer: "Carol",
};
var democracyQ = {
  question: "After the fall of the farm, he declared, This is not a democracy anymore.",
  answers: ["Glenn Rhee", "Daryl Dixon", "Rick Grimes", "Hershel Greene"],
  correctAnswer: "Rick Grimes",
};
var protectQ = {
  question: "He felt Rick could not protect Lori and Carl and said, The right choice is the one that keeps us alive.",
  answers: ["T-Dog", "Daryl Dixon", "Shane Walsh", "Dale Horvath"],
  correctAnswer: "Shane Walsh",
};
var OceansideQ = {
  question: "Which member of Rick's group discovered Oceanside?",
  answers: ["Carol", "Tara", "Michonne", "Daryl"],
  correctAnswer: "Tara",
};
var bornQ = {
  question: "Which of these children was born at the Hilltop?",
  answers: ["Sophia (Carol's daughter)", "Judith (Lori's daughter)", "Hershel (Maggie's son)", "Gracie (Aaron's daughter)"],
  correctAnswer: "Hershel (Maggie's son)",
};
var ProjectQ = {
  question: "He claimed, I was part of a ten-person team at the Human Genome Project to weaponize diseases to fight weaponized diseases.",
  answers: ["Milton", "Abraham", "Eugene", "Dr. Jenner"],
  correctAnswer: "Eugene",
};

// array containing the question objects
var quizQuestionsArray = [
  headquartersQ,
  HilltopQ,
  flowersQ,
  democracyQ,
  protectQ,
  OceansideQ,
  bornQ,
  ProjectQ,
]; // array!!!!

// setting display visibility
scoreDisplay.hidden = true; //  hide score, timer, and q&a areas
timerDisplay.hidden = true;
questionDisplay.hidden = true;
gameOverDisplay.hidden = true; // hide all end screens
gameOverOverlay.hidden = true;
HighScoreList.hidden = true;
letsGoAgain.hidden = true;

// begin script
init();

// retrieves list of previous scores in local storage
function init() {
  // need to parse array of user score objects
  var storedScoreList = JSON.parse(localStorage.getItem("scoresList"));

  // assign the parsed array to scoreList array to render later
  if (storedScoreList !== null) {
    scoreList = storedScoreList;
  }
  // prepare the score list to show later
  renderScoreList();
  // we are at start of the quiz
  currentQuestion = 0;
}

// start or restarting quiz; reset all visible sections and variables
function startQuiz(event) {
  event.preventDefault();
  footer.hidden = true;
  gameOverSplash.hidden = true;
  titleDisplay.hidden = true;
  startButton.hidden = true;
  score = 000; // reset score
  currentTime = 60; //reset clock
  currentQuestion = 0; // reset to start of quiz
  questionDisplay.hidden = false; // show Q&A
  // display score and timer
  scoreDisplay.textContent = "Score: 00" + score;
  scoreDisplay.hidden = false;
  timerDisplay.textContent = "Time: " + currentTime;
  timerDisplay.hidden = false; // could be put in function instead

  // initialize countdown timer
  setTime();
  // render Q&A
  renderQuestion();
}

// this function taken from class activities
// begins the countdown
function setTime() {
  timerInterval = setInterval(function () {
    currentTime--;
    timerDisplay.textContent = "Time: " + currentTime;

    // Time is up, game over
    if (currentTime <= 0) {
      clearInterval(timerInterval);
      gameOver();
    }
    // if you have less than 10 secs left
    // display a red shadow around the timer
    if (currentTime <= 10) {
      timerDisplay.setAttribute("style", "box-shadow: 0px 5px 2px red");
    }
  }, 1000);
}

// populates the question and answer fields
function renderQuestion() {
  // did we run out of questions? if so, game over.
  if (currentQuestion >= quizQuestionsArray.length) {
    gameOver();
    return;
  }
  // reset all of the stylings from right/wrong answers and displays
  answerOne.removeAttribute("style");
  answerTwo.removeAttribute("style");
  answerThree.removeAttribute("style");
  answerFour.removeAttribute("style");
  scoreDisplay.removeAttribute("style");
  timerDisplay.removeAttribute("style");

  //reset to default 4 choices
  answerOne.hidden = false;
  answerTwo.hidden = false;
  answerThree.hidden = false;
  answerFour.hidden = false;
  // perhaps will implement true of false questions
  if (quizQuestionsArray[currentQuestion].answers.length < 4) {
    //true of false question
    answerThree.hidden = true;
    answerFour.hidden = true;
  }

  //   populate next question and its answer choices
  quizQuestion.textContent = quizQuestionsArray[currentQuestion].question;
  // go print list of answers for however many answers there are
  // only <p> elements are the possible answer choices
  var listOfAnswers = document.querySelectorAll("p");
  for (var i = 0; i < quizQuestionsArray[currentQuestion].answers.length; i++) {
    listOfAnswers[i].textContent =
      quizQuestionsArray[currentQuestion].answers[i];
  }
}

// this function checks for right or wrong responses
function verifyResponse(event) {
  event.preventDefault();
  // grab this element being clicked
  var thisAnswer = event.target;
  // this variable holds the return value of setTimeout()
  var timeOutId = 0;

  if (
    // correct choice!
    thisAnswer.textContent === quizQuestionsArray[currentQuestion].correctAnswer
  ) {
    // disabled double click
    thisAnswer.setAttribute(
      // change style to green to indicate correct choice
      "style",
      "background-color: rgb(104, 226, 56); color: white; box-shadow: 0px 5px 2px rgb(104, 226, 56);pointer-events:none"
    );
    score = score + 377; // get 377 points
    currentQuestion++; // go to next question index
    // update score, flash green
    scoreDisplay.textContent = "Score: " + score;
    scoreDisplay.setAttribute(
      "style",
      "box-shadow: 0px 5px 3px rgb(104, 226, 56)"
    );
    // this function sets a delay, so we can see if you got it right or wrong
    // then render the next question after the short delay
    timeOutID = window.setTimeout(renderQuestion, 600);
  } else {
    // wrong choice!
    //  disabled double click
    thisAnswer.setAttribute(
      // style this answer with red to indicate incorrect response
      "style",
      "background-color: red; color: white; box-shadow: 0px 5px 2px red;pointer-events:none"
    );
    // flash timer display with yellow to indicated penalty
    timerDisplay.setAttribute("style", "box-shadow: 0px 5px 3px yellow");
    currentTime = currentTime - 7; // penalty, you got it wrong!
    currentQuestion++; // next question
    // delay to show the color indication right or wrong
    timeOutID = window.setTimeout(renderQuestion, 600);
  }
}

// this function is called when
// A. time is up, or B. we ran out of questions
function gameOver() {
  gameOverOverlay.hidden = false; // display overlay and game over screen
  gameOverDisplay.hidden = false;
  gameOverSplash.hidden = false; // prompt user name
  userNameForm.hidden = false; // display scores and buttons
  clearHighScores.hidden = false;
  retakeQuiz.hidden = false;
  letsGoAgain.hidden = false;
  HighScoreList.hidden = false;

  clearInterval(timerInterval); // freeze time
  // display final score
  gameOverScore.textContent = "Game Over! You got a score of " + score + "!";
}

// this function is called to store a new entry
function storeScores() {
  localStorage.setItem("scoresList", JSON.stringify(scoreList));
}

// this function renders the score list
function renderScoreList() {
  // first clear everything
  dynamicList.innerHTML = "";

  // loop through the stored scores and print them onto li elements
  for (var i = 0; i < scoreList.length; i++) {
    var storedScores = scoreList[i];
    var li = document.createElement("li");
    li.textContent = scoreList[i].name + " -- // -- " + scoreList[i].highScore;
    dynamicList.appendChild(li);
  }
}

// double submit capability
// with enter or clicking submit button
function submitScores(event) {
  event.preventDefault();
  // grab user input name
  var user = userName.value.trim();
  // clear the input field
  userName.value = "";
  // if empty string, don't submit
  if (user === "") {
    return;
  }
  // create a new object containing user and score pair
  var userScore = {
    name: user,
    highScore: score,
  };
  // push new user-score pair into score list array
  scoreList.push(userScore);
  // now store, then display score list
  storeScores();
  userNameForm.hidden = true;
  gameOverSplash.hidden = true;
  HighScoreList.hidden = false;
  letsGoAgain.hidden = false;
  renderScoreList();
}
// this function erases local storage, score list,
// and clears global array variable
function clearScores(event) {
  // need to clear local storage too
  event.preventDefault();
  dynamicList.innerHTML = "";
  localStorage.clear();
  scoreList = [];
}

// event listeners for buttons and submit
startButton.addEventListener("mouseup", startQuiz);
answerOne.addEventListener("click", verifyResponse);
answerTwo.addEventListener("click", verifyResponse);
answerThree.addEventListener("click", verifyResponse);
answerFour.addEventListener("click", verifyResponse);
submitBtn.addEventListener("click", submitScores);
userNameForm.addEventListener("submit", submitScores);
clearHighScores.addEventListener("mouseup", clearScores);
// retake the quiz, go to start of application
retakeQuiz.addEventListener("mouseup", function (event) {
  event.preventDefault();
  gameOverDisplay.hidden = true;
  gameOverOverlay.hidden = true;
  questionDisplay.hidden = true;
  scoreDisplay.hidden = true;
  timerDisplay.hidden = true;
  footer.hidden = false;
  titleDisplay.hidden = false;
  startButton.hidden = false;
});
