// array containing quiz questios
var gameArray = [
  (one = {
    question: "Which of the following is not a JS array method?",
    options: [createListItem("pop()"), createListItem("JSON.parse()"), createListItem("slice()"), createListItem("concat()")],
    answer: "JSON.parse()",
  }),
  (two = {
    question:
      "Which of the following statements about Window Object Properties is false?",
    options: [
      "The closed property returns a boolean true if a window is closed.",
      "The document property returns the frame in which the window runs.",
      "The outherHeight property returns the height of the browser window, including toolbars/scrollbars.",
      "The sessionStorage property allows to save key/value pairs in a web browser and stores the data for one session.",
    ],
    answer: "The document property returns the frame in which the window runs.",
  }),
  (three = {
    question:
      "Cookies are for client-server applications, while local storage is for client applications.",
    options: ["True", "False"],
    answer: "True",
  }),
  (four = {
    question: "Which of the following is not an Event Object?",
    options: ["ClipboardEvent", "MouseEvent", "LifeChangingEvent", "DragEvent"],
    answer: "LifeChangingEvent",
  }),
];

var body = document.body;
// create h1 element
var headingOne = document.createElement("h1");

// create ordered list
// var ol = document.createElement("ol");
// var li = document.createElement("li");

// create p element
var p = document.createElement("p");

// function support variables
// var counter = 0;
// var increment = gameArray[counter];

// headingOne.textContent = "This is a test";

// body.appendChild(mainEl).appendChild(headingOne);

// ================================================================
// display();

// function displays game question
// function display() {
//   gameQuestion();
//   answerOptions();
//   if (counter !== gameArray.length) {
//     counter++;
//   } else {
//     counter = 0;
//   }

// }

// appends game question for use in other functions
// function gameQuestion() {
//   headingOne.textContent = increment.question;
//   body.appendChild(headingOne);
// }

// appends ol and answer options for use in other functions
// function answerOptions() {
//   var arr = gameArray[counter].options;
//   body.appendChild(ol);

//   for (i = 0; i < arr.length; i++) {
//     li.textContent = arr[i];
//     ol.appendChild(li);
//   }
// }


function createListItem(text) {
    var li = document.createElement("li");
    li.textContent = text;
    return li;
}

function appendChildren(parent, children) {
    children.forEach(function (child) {
        parent.appendChild(child);
    })
}

var main = document.getElementById("main");
var list = document.getElementById("list");
var items = gameArray[0].options;

headingOne.textContent = gameArray[0].question;
main.insertBefore(headingOne, list);
appendChildren(list, items);