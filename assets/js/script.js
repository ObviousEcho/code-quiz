// array containing quiz questios
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

// ================================================================

beginGame();

function init() {
appendChildren(list, items);
questionHeading();
}

// function creates title and direction elements along with button to begin game
function beginGame() {
  var div = document.createElement("div");
  var h2 = document.createElement("h2");
  var parag = document.createElement("p");
  var startBtn = document.createElement("button");
  h2.textContent ="Test your knowledge of Javascript";
  parag.textContent = "Click the start button to begin."
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
startBtnEvent.addEventListener("click", function(){
  var div = document.querySelector(".visible");
  div.setAttribute("class", "hidden");
  init();
})

// function called above in gameArray.options
// function creates <li><button> with answer options passed in from function call
function createListItem(text) {
  var button = document.createElement("button");
  var li = document.createElement("li");
  li.textContent = text;
  button.setAttribute("class", "btn");
  button.appendChild(li);
  return button;
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
}

// eventListener for button clicks
// retrieves buttons with class of btn in an array
var btns = document.getElementsByClassName("btn");
// stores most recent button clicked in var
var btnClicked;
// loop through array of buttons applying eventListener to each
for(i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(event) {
    var element = event.target;
    return btnClicked = element.textContent;
  })
}