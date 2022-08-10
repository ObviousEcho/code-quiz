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
var div = document.querySelector(".container");
var list = document.getElementById("list");
// var's to help iterate through gameArray
var index = 0;
var items = gameArray[index].options;
// retrieves buttons with class of btn in an array
var btns = document.getElementsByClassName("btn");
// variable to compare answers and keep score
var answer = gameArray[index].answer;

// stores most recent button clicked in var
var btnClicked;
// ================================================================

beginGame();

// core logic of game
function init() {
  game();


  // eventListener for button clicks
  // loop through array of buttons applying eventListener to each
  for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
      var element = event.target;
      btnClicked = element.textContent;
      if (btnClicked === answer && index < gameArray.length - 1) {
        index++;
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

function game() {
  setTime();
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
  h2.textContent = "Enter your initials to save your score.";
  label.textContent = "Enter your initials";
  main.appendChild(h2);
  form.appendChild(label);
  form.appendChild(input);
  main.appendChild(form);
  label.setAttribute("for", "initial");
  input.setAttribute("type", "text");
  input.setAttribute("id", "initial");
  input.setAttribute("name", "initials");
  form.setAttribute("id", "form");
  submit();
}

// creates submit button
function submit() {
  var submit = document.createElement("input");
  main.appendChild(submit);
  submit.setAttribute("type", "submit");
  submit.setAttribute("value", "submit");
  submit.setAttribute("id", "submit");
}

// timer function:
var h3 = document.createElement("h3");
var timeDiv = document.createElement("div");
var timeEl = document.createElement("p");

function setTime() {
  var secondsLeft = 10;
  // sets interval in variable
  var timerInterval = setInterval(function () {
      
    // appends time to html
      secondsLeft--;
      h3.textContent = "Time Left:";
      timeEl.textContent = secondsLeft;
      timeDiv.setAttribute("id", "timer")
      timeDiv.appendChild(h3);
      timeDiv.appendChild(timeEl);
      main.appendChild(timeDiv);

      // game ends and timer stops at 0
      if (secondsLeft <= 0) {
          clearInterval(timerInterval);
      } 
  }, 1000);
}