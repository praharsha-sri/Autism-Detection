const radioOptions = ["बिलकुल नहीं", "कभी-कभी", "बार-बार", "अधिकतर", "हमेशा"];

// Scoring system
const scoreValues = {
    "बिलकुल नहीं": 1,
    "कभी-कभी": 2,
    "बार-बार": 3,
    "अधिकतर": 4,
    "हमेशा": 5,
  };
function generateRadioButtons(questionId) {
  const radioGroup = document.getElementById(questionId);
  radioOptions.forEach((option) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="${questionId}" value="${option}" onchange="updateScore()"> ${option}`;
    radioGroup.appendChild(label);
  });
}

// Function to initialize radio buttons for a set of questions
function initializeRadioButtons(questionIds) {
  questionIds.forEach(generateRadioButtons);
}

function showAlert() {
  document.getElementById("customAlert").style.display = "flex"; // Show the custom alert
}

function closeAlert() {
  document.getElementById("customAlert").style.display = "none"; // Hide the custom alert
}

function validateForm() {
  // Get all radio groups
  const questions = document.querySelectorAll(".radio-group");

  // Iterate over each question
  for (let i = 0; i < questions.length; i++) {
    const radioButtons = questions[i].querySelectorAll('input[type="radio"]');

    // Check if at least one radio button is checked
    let isChecked = false;
    for (let j = 0; j < radioButtons.length; j++) {
      if (radioButtons[j].checked) {
        isChecked = true;
        break;
      }
    }

    // If no radio button is checked, show modal and stop form submission
    if (!isChecked) {
      showAlert(); // Show the custom alert
      return false; // Prevent form submission
    }
  }

  return true; // All questions are answered, proceed with form submission
}

// Function to calculate and update the score
function updateScore() {
  const questions = document.querySelectorAll(".radio-group");
  let totalScore = 0;
  const maxPossibleScore = questions.length * 5; // 5 is the maximum score for each question

  questions.forEach((question) => {
    const selectedOption = question.querySelector(
      'input[type="radio"]:checked'
    );
    if (selectedOption) {
      totalScore += scoreValues[selectedOption.value];
    }
  });

  const scorePercentage = (totalScore / maxPossibleScore) * 100;

  // Update or create the score display
  let scoreDisplay = document.getElementById("scoreDisplay");
  if (!scoreDisplay) {
    scoreDisplay = document.createElement("div");
    scoreDisplay.id = "scoreDisplay";
    scoreDisplay.style.marginTop = "20px";
    scoreDisplay.style.fontWeight = "bold";
    document.querySelector("form").appendChild(scoreDisplay);
  }
  scoreDisplay.textContent = `वर्तमान स्कोर: ${totalScore} out of ${maxPossibleScore} (${scorePercentage.toFixed(
    2
  )}%)`;
}
