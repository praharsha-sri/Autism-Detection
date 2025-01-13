// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC_8gFPJrjBhjs4Zj5YDyYcoZQjfl6Amr0",
    authDomain: "autism-evaluation-platform.firebaseapp.com",
    projectId: "autism-evaluation-platform",
    storageBucket: "autism-evaluation-platform.firebasestorage.app",
    messagingSenderId: "748226978662",
    appId: "1:748226978662:web:cddef872e6bfc1fb131ea7",
    measurementId: "G-1TGEHTTJF4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1]);
}

// Function to display data on page load
function displayCaseHistory() {
    // Get the user ID from URL parameter
    const userId = getUrlParameter('id');

    if (!userId) {
        console.error('No user ID provided');
        alert('Error: No user ID found');
        return;
    }

    // Reference to the case history collection for this user
    const caseHistoryRef = db.collection('users').doc(userId).collection('casehistory');

    // Fetch the case history
    caseHistoryRef.get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("No case history found for this user.");
            alert('No case history found');
            return;
        }

        // Process the first document (assuming only one case history per user)
        querySnapshot.forEach((doc) => {
            const data = doc.data();

            // Populate Identification Section
            if (data.identification) {
                document.getElementById('identification-name').textContent = data.identification.name || 'N/A';
                document.getElementById('identification-age').textContent = data.identification.age || 'N/A';
                document.getElementById('identification-gender').textContent = data.identification.gender || 'N/A';
                document.getElementById('identification-dob').textContent = data.identification.dob || 'N/A';
                document.getElementById('identification-informant').textContent = data.identification.informant || 'N/A';
                document.getElementById('identification-parentOccupation').textContent = data.identification.parentOccupation || 'N/A';
                document.getElementById('identification-referral').textContent = data.identification.referral || 'N/A';
                document.getElementById('identification-complaints').textContent = data.identification.complaints || 'N/A';
            }

            // Populate Behavior Section
            if (data.behavior) {
                document.getElementById('behavior-behave').textContent = data.behavior.behave || 'N/A';
                document.getElementById('behavior-differentbeh').textContent = data.behavior.differentbeh || 'N/A';
                document.getElementById('behavior-hearing').textContent = data.behavior.hearing || 'N/A';
                document.getElementById('behavior-homebehaviour').textContent = data.behavior.homebehaviour || 'N/A';
                document.getElementById('behavior-orientation').textContent = data.behavior.orientation || 'N/A';
                document.getElementById('behavior-socialbehaviour').textContent = data.behavior.socialbehaviour || 'N/A';
                document.getElementById('behavior-speech').textContent = data.behavior.speech || 'N/A';
                document.getElementById('behavior-vision').textContent = data.behavior.vision || 'N/A';
            }

            // Populate Educational Section
            if (data.educational) {
                document.getElementById('educational-anyOtherEducational').textContent = data.educational.anyOtherEducational || 'N/A';
                document.getElementById('educational-peerTeacherRelationship').textContent = data.educational.peerTeacherRelationship || 'N/A';
                document.getElementById('educational-schoolAge').textContent = data.educational.schoolAge || 'N/A';
                document.getElementById('educational-schoolIssues').textContent = data.educational.schoolIssues || 'N/A';
            }

            // Populate Family Section
            if (data.family) {
                document.getElementById('family-anyOthers').textContent = data.family.anyOthers || 'N/A';
                document.getElementById('family-consanguinity').textContent = data.family.consanguinity || 'N/A';
                document.getElementById('family-siblingHistory').textContent = data.family.siblingHistory || 'N/A';
            }

            // Populate Parental Section
            if (data.parental) {
                document.getElementById('parental-addiction').textContent = data.parental.addiction || 'N/A';
                document.getElementById('parental-ageOfMother').textContent = data.parental.ageOfMother || 'N/A';
                document.getElementById('parental-familyIllness').textContent = data.parental.familyIllness || 'N/A';
                document.getElementById('parental-marriageDetails').textContent = data.parental.marriageDetails || 'N/A';
                document.getElementById('parental-mothersHealth').textContent = data.parental.mothersHealth || 'N/A';
                document.getElementById('parental-otherDetails').textContent = data.parental.otherDetails || 'N/A';
            }

            // Populate Perinatal Section
            if (data.perinatal) {
                document.getElementById('perinatal-birthCry').textContent = data.perinatal.birthCry || 'N/A';
                document.getElementById('perinatal-birthWeight').textContent = data.perinatal.birthWeight || 'N/A';
                document.getElementById('perinatal-complicationDuringBirth').textContent = data.perinatal.complicationDuringBirth || 'N/A';
                document.getElementById('perinatal-deliveryNature').textContent = data.perinatal.deliveryNature || 'N/A';
                document.getElementById('perinatal-premature').textContent = data.perinatal.premature || 'N/A';
                document.getElementById('perinatal-prolongedLabor').textContent = data.perinatal.prolongedLabor || 'N/A';
            }

            // Populate Play History Section
            if (data.playhistory) {
                document.getElementById('playhistory-motordev').textContent = data.playhistory.motordev || 'N/A';
                document.getElementById('playhistory-playinghistory').textContent = data.playhistory.playinghistory || 'N/A';
                document.getElementById('playhistory-sensorydev').textContent = data.playhistory.sensorydev || 'N/A';
                document.getElementById('playhistory-socialdev').textContent = data.playhistory.socialdev || 'N/A';
                document.getElementById('playhistory-speechdev').textContent = data.playhistory.speechdev || 'N/A';
            }

            // Populate Postnatal Section
            if (data.postnatal) {
                document.getElementById('postnatal-ageWalking').textContent = data.postnatal.ageWalking || 'N/A';
                document.getElementById('postnatal-milestones').textContent = data.postnatal.milestones || 'N/A';
                document.getElementById('postnatal-nightSleep').textContent = data.postnatal.nightSleep || 'N/A';
                document.getElementById('postnatal-vaccination').textContent = data.postnatal.vaccination || 'N/A';
            }
        });
    }).catch((error) => {
        console.error("Error getting case history: ", error);
        alert('Error fetching case history');
    });
}

// Call displayCaseHistory on page load
window.onload = displayCaseHistory;