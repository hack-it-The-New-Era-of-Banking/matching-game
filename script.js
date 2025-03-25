const allWords = [
  "Blockchain",
  "Cryptocurrency",
  "Bitcoin",
];

let generatedWords = [];
let controllers = {}; // Map each word to its input element
let submitted = false;

const wordListDiv = document.getElementById("wordList");
const instructionP = document.getElementById("instruction");
const actionButton = document.getElementById("actionButton");

function generateWords() {
  generatedWords = [];
  controllers = {};
  for (let i = 0; i < 3; i++) {
    const randomIndex = Math.floor(Math.random() * allWords.length);
    generatedWords.push(allWords[randomIndex]);
  }
  submitted = false;
  renderMainView();
}

function renderMainView() {
  wordListDiv.innerHTML = "";
  if (generatedWords.length === 0) {
    instructionP.style.display = "block";
    actionButton.innerText = "Start";
  } else {
    instructionP.style.display = "none";
    generatedWords.forEach((word) => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.innerText = word;
      rowDiv.appendChild(wordSpan);

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Please Enter";
      controllers[word] = input;
      rowDiv.appendChild(input);

      wordListDiv.appendChild(rowDiv);
    });
    actionButton.innerText = "Submit";
  }
}

function handleSubmit() {
  // Check if all fields are filled.
  let allFilled = true;
  generatedWords.forEach((word) => {
    if (!controllers[word].value.trim()) {
      allFilled = false;
    }
  });
  if (!allFilled) {
    alert("Please fill in all text fields before submitting.");
    return;
  }
  submitted = true;
  renderSubmittedView();
}

function renderSubmittedView() {
  wordListDiv.innerHTML = "";
  instructionP.style.display = "none";
  actionButton.style.display = "none"; // Remove the button after submission

  const listView = document.createElement("div");
  listView.className = "listView";
  generatedWords.forEach((word) => {
    const listItem = document.createElement("div");
    listItem.className = "listItem";

    const title = document.createElement("div");
    title.innerText = word;
    title.style.fontSize = "20px";
    title.style.color = "white";

    const subtitle = document.createElement("div");
    subtitle.innerText = controllers[word].value;
    subtitle.style.fontSize = "16px";
    subtitle.style.color = "white";

    listItem.appendChild(title);
    listItem.appendChild(subtitle);
    listView.appendChild(listItem);
  });
  wordListDiv.appendChild(listView);
}

actionButton.addEventListener("click", function () {
  if (generatedWords.length === 0) {
    generateWords();
  } else if (!submitted) {
    handleSubmit();
  }
});
