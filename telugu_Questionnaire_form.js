const radioOptions = ['అరుదుగా', 'కొన్నిసార్లు', 'తరచుగా', 'ఎక్కువగా', 'ఎల్లప్పుడూ'];

// స్కోరింగ్ సిస్టమ్
const scoreValues = {
  'అరుదుగా': 1,
  'కొన్నిసార్లు': 2,
  'తరచుగా': 3,
  'ఎక్కువగా': 4,
  'ఎల్లప్పుడూ': 5,
};

function generateRadioButtons(questionId) {
  const radioGroup = document.getElementById(questionId);
  radioOptions.forEach((option) => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="radio" name="${questionId}" value="${option}" onchange="updateScore()"> ${option}`;
    radioGroup.appendChild(label);
  });
}

// ప్రశ్నల కోసం రేడియో బటన్‌లను సృష్టించే ఫంక్షన్
function initializeRadioButtons(questionIds) {
  questionIds.forEach(generateRadioButtons);
}

function showAlert() {
  document.getElementById('customAlert').style.display = 'flex'; // కస్టమ్ అలర్ట్ చూపించు
}

function closeAlert() {
  document.getElementById('customAlert').style.display = 'none'; // కస్టమ్ అలర్ట్ దాచు
}

function validateForm() {
  const questions = document.querySelectorAll('.radio-group'); // అన్ని రేడియో గ్రూప్‌లను పొందండి

  // ప్రతి ప్రశ్నను పరిశీలించండి
  for (let i = 0; i < questions.length; i++) {
    const radioButtons = questions[i].querySelectorAll('input[type="radio"]');
    let isChecked = false;

    for (let j = 0; j < radioButtons.length; j++) {
      if (radioButtons[j].checked) {
        isChecked = true;
        break;
      }
    }

    if (!isChecked) {
      showAlert(); // కస్టమ్ అలర్ట్ చూపించు
      return false; // ఫారం సబ్మిట్‌ను నిలిపివేయండి
    }
  }

  return true; // అన్ని ప్రశ్నలకు సమాధానమిచ్చిన తర్వాత మాత్రమే ఫారం సబ్మిట్ చేయండి
}

// స్కోరు లెక్కించి అప్‌డేట్ చేసే ఫంక్షన్
function updateScore() {
  const questions = document.querySelectorAll('.radio-group');
  let totalScore = 0;
  const maxPossibleScore = questions.length * 5; // గరిష్ఠ స్కోరు 5

  questions.forEach((question) => {
    const selectedOption = question.querySelector('input[type="radio"]:checked');
    if (selectedOption) {
      totalScore += scoreValues[selectedOption.value];
    }
  });

  const scorePercentage = (totalScore / maxPossibleScore) * 100;

  // స్కోరు ప్రదర్శనను అప్‌డేట్ లేదా సృష్టించు
  let scoreDisplay = document.getElementById('scoreDisplay');
  if (!scoreDisplay) {
    scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'scoreDisplay';
    scoreDisplay.style.marginTop = '20px';
    scoreDisplay.style.fontWeight = 'bold';
    document.querySelector('form').appendChild(scoreDisplay);
  }
  scoreDisplay.textContent = `ప్రస్తుత స్కోరు: ${totalScore} మొత్తం ${maxPossibleScore} (${scorePercentage.toFixed(
    2
  )}%)లో`;

  // లోకల్ స్టోరేజ్‌లో స్కోరు నిల్వ చేయండి
  localStorage.setItem('socialRelationshipScore', totalScore); // ప్రత్యేక కీ ఉపయోగించండి
}
