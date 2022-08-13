// array containing quiz questions
var gameArray = [
  (zero = {
    question: "Which of the following is not a JS array method?",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [
      createListItem("pop()"),
      createListItem("JSON.parse()"),
      createListItem("slice()"),
      createListItem("concat()"),
    ],
    answer: "JSON.parse()",
  }),
  (one = {
    question:
      "The document property returns the frame in which the window runs.",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [createListItem("True"), createListItem("False")],
    answer: "False",
  }),
  (two = {
    question:
      "Cookies are for client-server applications, while local storage is for client applications.",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [createListItem("True"), createListItem("False")],
    answer: "True",
  }),
  (three = {
    question: "Which of the following is not an Event Object?",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [
      createListItem("ClipboardEvent"),
      createListItem("MouseEvent"),
      createListItem("LifeChangingEvent"),
      createListItem("DragEvent"),
    ],
    answer: "LifeChangingEvent",
  }),
];

// fetch elements from document
var main = document.getElementById("main");
var header = document.getElementById("header");
var div = document.querySelector(".container");
var list = document.getElementById("list");
// var's to help iterate through gameArray
var index = 0;
var items = gameArray[index].options;
// retrieves buttons with class of btn in an array
var btns = document.getElementsByClassName("btn");
// variable to compare answers
var answer = gameArray[index].answer;
// stores most recent button clicked in var
var btnClicked;
// variable to store score
var score = 0;
// variable to store high score
var highScore = [];
// ================================================================

beginGame();

function init() {
  game();

  // eventListener for button clicks
  // loop through array of buttons applying eventListener to each
  for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
      var element = event.target;
      btnClicked = element.textContent;
      // conditional statements compare button clicked to answer stored inside object on gameArray
      if (btnClicked === answer && index < gameArray.length - 1) {
        index++;
        score++;
        items = gameArray[index].options;
        answer = gameArray[index].answer;
        correct();
        setTimeout(nextQuestion, 1000);
      } else if (btnClicked !== answer && index < gameArray.length - 1) {
        index++;
        items = gameArray[index].options;
        answer = gameArray[index].answer;
        incorrect();
        setTimeout(nextQuestion, 1000);
      } else if (btnClicked === answer && index === gameArray.length - 1) {
        index = 0;
        score++;
        items = gameArray[index].options;
        answer = gameArray[index].answer;
        correct();
        setTimeout(gameEnd, 1000);
      } else if (btnClicked !== answer && index === gameArray.length - 1) {
        index = 0;
        items = gameArray[index].options;
        answer = gameArray[index].answer;
        incorrect();
        setTimeout(gameEnd, 1000);
      }
    });
  }
}

// function creates title and direction elements along with button to begin game
function beginGame() {
  getLocalStorage();
  var div = document.createElement("div");
  var h2 = document.createElement("h2");
  var parag = document.createElement("p");
  var startBtn = document.createElement("button");
  h2.textContent = "Test your knowledge of Javascript";
  parag.textContent = "Click the start button to begin.";
  startBtn.textContent = "Start";
  div.appendChild(h2);
  div.appendChild(parag);
  div.appendChild(startBtn);
  div.setAttribute("class", "visible");
  startBtn.setAttribute("class", "start");
  main.appendChild(div);
}

// click to begin game!!!
// selects div with class start as created in beginGame function
var startBtnEvent = document.querySelector(".start");
// changes div class hidden (display: none) to remove content as game progresses
startBtnEvent.addEventListener("click", function () {
  var div = document.querySelector(".visible");
  div.setAttribute("class", "hidden");
  init();
  setTime();
});

// function called above in gameArray.options
// function creates <li><button> with answer options passed in from function call
function createListItem(text) {
  var button = document.createElement("button");
  var li = document.createElement("li");
  button.textContent = text;
  button.setAttribute("class", "btn");
  li.appendChild(button);
  return li;
}

// takes two arguments, parent/element and children/array
// each index within the array is appended to the parent element
function appendChildren(parent, children) {
  children.forEach(function (child) {
    parent.appendChild(child);
  });
}

// dynamic creation of quiz question element
function questionHeading() {
  var headingTwo = document.createElement("h2");
  headingTwo.textContent = gameArray[index].question;
  main.insertBefore(headingTwo, div);
  headingTwo.setAttribute("class", "question");
}

// appends questioins and lists to document
function game() {
  questionHeading();
  appendChildren(list, items);
}

// appends correct to document
function correct() {
  var parag = document.createElement("p");
  parag.textContent = "Correct";
  div.appendChild(parag);
  parag.setAttribute("style", "border-top: 3px solid gray");
  parag.setAttribute("id", "answer");
}

// appends incorrect to document
function incorrect() {
  var parag = document.createElement("p");
  parag.textContent = "Incorrect";
  div.appendChild(parag);
  parag.setAttribute("style", "border-top: 3px solid gray");
  parag.setAttribute("id", "answer");
}

// clears continer for next question
function nextQuestion() {
  removeElem();
  removeLiItems();
  init();
}

// removes h2, and p elements from document
function removeElem() {
  var h2 = document.querySelector(".question");
  var parag = document.getElementById("answer");
  h2.remove();
  parag.remove();
}

// removes li items from document
function removeLiItems() {
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}

// removes questions from document, displays highscore form
function gameEnd() {
  removeElem();
  removeLiItems();
  form();
}

// creates input form dynamically
function form() {
  var h2 = document.createElement("h2");
  var form = document.createElement("form");
  var label = document.createElement("label");
  var input = document.createElement("input");
  var submit = document.createElement("input");
  h2.textContent = "Enter your initials to save your score.";
  label.textContent = "Enter your initials";
  main.appendChild(h2);
  form.appendChild(label);
  form.appendChild(input);
  main.appendChild(form);
  h2.setAttribute("id", "save-score");
  label.setAttribute("for", "initial");
  input.setAttribute("type", "text");
  input.setAttribute("id", "initial");
  input.setAttribute("name", "initial");
  form.setAttribute("id", "form");
  form.appendChild(submit);
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");
  submit.setAttribute("id", "submit");

  // eventListener for submit button
  var inputForm = document.getElementById("form");
  // captures users initial input from form and store to localStorage
  inputForm.addEventListener("submit", function (event) {
    var initialInput = document.getElementById("initial");
    event.preventDefault();
    var yourScore = {
      initials: initialInput.value.trim(),
      score: score,
    };
    // if text in input field, getLocalStorage, else display error msg
    if (yourScore.initials !== "") {
      highScore.push(yourScore);
      localStorage.setItem("high score", JSON.stringify(highScore));
      initialInput.value = "";
      getLocalStorage();
      palyAgain();
    } else {
      error();
      return palyAgain();
    }
  });
}

// empty string error
function error() {
  var h6 = document.createElement("h6");
  h6.textContent = "Invalid Entry!";
  main.appendChild(h6);
  h6.setAttribute("style", "color: red");
  h6.setAttribute("id", "invalid");
}

//   get localstorage
function getLocalStorage() {
  var highScores = JSON.parse(localStorage.getItem("high score"));
  highScore = highScores;
  console.log(highScore);
}

// timer function:
var h3 = document.createElement("h3");
var h4 = document.createElement("h4");
var secondsLeft = 30;

function setTime() {
  // sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    if (secondsLeft <= 0) {
      clearInterval(timerInterval);
    }
    // appends time to html
    var header = document.getElementById("header");
    h4.textContent = "Time: " + secondsLeft;
    header.appendChild(h4);
    h4.setAttribute("id", "count-down");
  }, 1000);
}

// eventListener on view high score link
var viewHighScore = document.getElementById("high-score");
viewHighScore.addEventListener("click", function (event) {
  event.preventDefault();
  removeToViewHighScore();
  appendHighScores();
  palyAgain();
});

// removes content from document
function removeToViewHighScore() {
  var title = document.querySelector(".visible");
  var question = document.querySelector(".question");
  var answer = document.getElementById("answer");
  var form = document.getElementById("form");
  var h2 = document.getElementById("save-score");
  var timer = document.getElementById("count-down");
  var invalid = document.getElementById("invalid");
  var playAgain = document.getElementById("play-again");

  // remove elements from document if they exist
  if (title !== null) {
    title.remove();
  } else if (question !== null && list !== null) {
    timer.remove();
    question.remove();
    removeLiItems();
  } else if (question !== null && list !== null && answer !== null) {
    timer.remove();
    question.remove();
    removeLiItems();
    answer.remove();
  } else if (form !== null) {
    timer.remove();
    h2.remove();
    form.remove();
    if (invalid !== null && playAgain !== null) {
      invalid.remove();
      playAgain.remove();
    }
  }
}

//   accesses localStorage to view high scores
function appendHighScores() {
  var highScores = JSON.parse(localStorage.getItem("high score"));
  highScore = highScores;
  console.log(highScore);
  for (i = 0; i < highScore.length; i++) {
    // if highScore has content
    if (highScore !== null) {
      console.log(highScore[i].initials);
      console.log(highScore[i].score);
      var li = document.createElement("li");
      li.textContent =
        "Initials: " + highScore[i].initials + " Score: " + highScore[i].score;
      list.appendChild(li);
    }
  }
}

// play again button
function palyAgain() {
  var button = document.createElement("button");
  button.textContent = "Play again!";
  main.appendChild(button);
  button.setAttribute("id", "play-again");
}

// event delegation, add eventListener to play again button
function startOver(event) {
  if (!event.target.matches("#play-again")) return;
  var title = document.getElementById("save-score");
  var form = document.getElementById("form");
  var button = document.getElementById("play-again");
  var invalid = document.getElementById("invalid");
  console.log(event.target);
  if (invalid !== null) {
    title.remove();
    form.remove();
    invalid.remove();
    button.remove();
    beginGame();
  } else if (title !== null && form !== null) {
    title.remove();
    form.remove();
    button.remove();
    beginGame();
  } else {
    removeLiItems();
    button.remove();
    beginGame();
  }
}

main.addEventListener("click", startOver);

