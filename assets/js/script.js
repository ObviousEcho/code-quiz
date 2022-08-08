// array containing quiz questions
var gameArray = [
  (one = {
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
  (two = {
    question:
      "The document property returns the frame in which the window runs.",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [createListItem("True"), createListItem("False")],
    answer: "False",
  }),
  (three = {
    question:
      "Cookies are for client-server applications, while local storage is for client applications.",
    // the options array calls the createListItem function when each
    // index is iterated through, passing in a string as an argument
    options: [createListItem("True"), createListItem("False")],
    answer: "True",
  }),
  (four = {
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
var list = document.getElementById("list");
// var's to help iterate through gameArray
var index = 0;
var items = gameArray[index].options;
// retrieves buttons with class of btn in an array
var btns = document.getElementsByClassName("btn");
// variable to compare answers and keep score
var answer = gameArray[index].answer;
var score = 0;

// ================================================================

beginGame();

// core logic of game
function init() {
  game();

  // stores most recent button clicked in var
  var btnClicked;

  // eventListener for button clicks
  // loop through array of buttons applying eventListener to each
  for (i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function (event) {
      var element = event.target;
      btnClicked = element.textContent;
      if (btnClicked === answer) {
        index++;
        correct();
        setTimeout(nextQuestion, 2000);
      } else {
        index++;
        incorrect();
        setTimeout(nextQuestion, 2000);
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
  main.insertBefore(headingTwo, list);
  headingTwo.setAttribute("class", "question");
}

function game() {
  questionHeading();
  appendChildren(list, items);
  console.log("index = " + index);
  console.log("items = " + items);
}

// appends correct to document
function correct() {
  var parag = document.createElement("p");
  parag.textContent = "Correct";
  main.appendChild(parag);
  parag.setAttribute("style", "border-top: 3px solid gray");
  parag.setAttribute("id", "answer");
}

// appends incorrect to document
function incorrect() {
  var parag = document.createElement("p");
  parag.textContent = "Incorrect";
  main.appendChild(parag);
  parag.setAttribute("style", "border-top: 3px solid gray");
  parag.setAttribute("id", "answer");
}

// clears continer for next question
function nextQuestion() {
  var h2 = document.querySelector(".question");
  var parag = document.getElementById("answer");
  h2.remove();
  parag.remove();
  removeLiItems();
  game();
}

// removes li items from document
function removeLiItems() {
  while(list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
}