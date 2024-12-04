// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC_8gFPJrjBhjs4Zj5YDyYcoZQjfl6Amr0",
  authDomain: "autism-evaluation-platform.firebaseapp.com",
  projectId: "autism-evaluation-platform",
  storageBucket: "autism-evaluation-platform.appspot.com",
  messagingSenderId: "748226978662",
  appId: "1:748226978662:web:cddef872e6bfc1fb131ea7",
  measurementId: "G-1TGEHTTJF4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
  } else {
    window.location.href = "login.html";
  }
});

export async function saveQuestionnaireData(formData) {
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);
  const questionnaireDocRef = doc(userDocRef, "questionnaires", formData.date);

  await setDoc(questionnaireDocRef, formData);
}

export async function saveDomainScore(domainName, score) {
  if (!currentUser) return;

  const userDocRef = doc(db, "users", currentUser.uid);
  const latestQuestionnaireQuery = await getDocs(
    query(
      collection(userDocRef, "questionnaires"),
      orderBy("date", "desc"),
      limit(1)
    )
  );

  if (!latestQuestionnaireQuery.empty) {
    const latestQuestionnaireDoc = latestQuestionnaireQuery.docs[0];
    await updateDoc(latestQuestionnaireDoc.ref, {
      [`scores.${domainName}`]: score,
    });
  }
}
