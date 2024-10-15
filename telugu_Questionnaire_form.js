const radioOptions = ['అరుదుగా', 'కొన్నిసార్లు', 'తరచుగా', 'ఎక్కువగా', 'ఎల్లప్పుడూ'];

// Function to generate radio buttons for each question
function generateRadioButtons(questionId) {
    const radioGroup = document.getElementById(questionId);
    radioOptions.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="${questionId}" value="${option}"> ${option}`;
        radioGroup.appendChild(label);
    });
}

// Initialize radio buttons for multiple questions
function initializeRadioButtons(questionIds) {
    questionIds.forEach(generateRadioButtons);
}

// Function to display alert
function showAlert() {
    document.getElementById('customAlert').style.display = 'flex'; // Custom alert display
}

// Function to close the alert
function closeAlert() {
    document.getElementById('customAlert').style.display = 'none'; // Hide alert
}

// Form validation to ensure all questions are answered
function validateForm() {
    const questions = document.querySelectorAll('.radio-group'); // Get all radio groups

    for (let i = 0; i < questions.length; i++) {
        const radioButtons = questions[i].querySelectorAll('input[type="radio"]');
        let isChecked = false;

        // Check if at least one radio button is selected
        for (let j = 0; j < radioButtons.length; j++) {
            if (radioButtons[j].checked) {
                isChecked = true;
                break;
            }
        }

        // If no radio button is selected, show alert and stop form submission
        if (!isChecked) {
            showAlert();
            return false;
        }
    }
    return true; // All questions answered, proceed with submission
}
