const radioOptions = ['Rarely', 'Sometimes', 'Frequently', 'Mostly', 'Always'];

function generateRadioButtons(questionId) {
    const radioGroup = document.getElementById(questionId);
    radioOptions.forEach(option => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="${questionId}" value="${option}"> ${option}`;
        radioGroup.appendChild(label);
    });
}
// Function to initialize radio buttons for a set of questions
function initializeRadioButtons(questionIds) {
    questionIds.forEach(generateRadioButtons);
}
function showAlert() {
    document.getElementById('customAlert').style.display = 'flex'; // Show the custom alert
}

function closeAlert() {
     document.getElementById('customAlert').style.display = 'none'; // Hide the custom alert
}

function validateForm() {
    // Get all radio groups
    
   const questions = document.querySelectorAll('.radio-group');
            
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