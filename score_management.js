function saveScore(key, score) {
  localStorage.setItem(key, score);
}

function getScore(key) {
  return localStorage.getItem(key);
}

function calculateTotalScore() {
  const domains = [
    "socialRelationshipScore",
    "emotionalResponseScore",
    "speechLanguageScore",
    "behaviorScore",
    "sensoryAspectScore",
    "cognitiveComponentScore",
  ];
  return domains.reduce((total, domain) => {
    const score = getScore(domain);
    return total + (score ? parseInt(score) : 0);
  }, 0);
}

function displayTotalScore() {
  const totalScore = calculateTotalScore();
  const totalScoreElement = document.getElementById("totalScore");
  if (totalScoreElement) {
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
  }
}
