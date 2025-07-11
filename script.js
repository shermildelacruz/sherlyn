// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcreW1WLJUmErDrIoKzaHwp-70YMLbbm0",
  authDomain: "sherlyn-db.firebaseapp.com",
  projectId: "sherlyn-db",
  storageBucket: "sherlyn-db.appspot.com",
  messagingSenderId: "230646046683",
  appId: "1:230646046683:web:ab52db97f91264b4ea51fe",
  measurementId: "G-Q678PY3GLT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

// Example: Read all documents from a collection called "users"
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
}

// Registration logic
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('registerStudentId').value;
    const fullName = document.getElementById('registerFullName').value;
    const age = document.getElementById('registerAge').value;
    const department = document.getElementById('registerDepartment').value;
    const yearLevel = document.getElementById('registerYearLevel').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const errorDiv = document.getElementById('registerErrorMessage');
    errorDiv.style.display = 'none';
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save additional info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        studentId,
        fullName,
        age,
        department,
        yearLevel,
        email
      });
      // Redirect to userinfo.html
      window.location.href = "userinfo.html";
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
}

// Login logic
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('errorMessage');
    errorDiv.style.display = 'none';
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "userinfo.html";
    } catch (error) {
      errorDiv.textContent = error.message;
      errorDiv.style.display = 'block';
    }
  });
} 