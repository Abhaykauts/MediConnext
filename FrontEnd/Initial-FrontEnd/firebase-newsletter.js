// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const googleBtn = document.querySelector('.google-btn');
if (googleBtn) {
  googleBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Signed in as ${user.displayName}`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  });
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwZMDwqJEDt2EZGIxu0fW8zVs0MjKG5rM",
  authDomain: "mediconnext.firebaseapp.com",
  projectId: "mediconnext",
  storageBucket: "mediconnext.firebasestorage.app",
  messagingSenderId: "1618806320",
  appId: "1:1618806320:web:ebb884cd36e665f01c4ff5",
  measurementId: "G-DT6SL3ZBDK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Handle form submission
document.getElementById("newsletterForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const subscribe = document.getElementById("subscribeCheckbox").checked;

  try {
    await addDoc(collection(db, "newsletterSubscribers"), {
      email: email,
      subscribed: subscribe,
      timestamp: serverTimestamp()
    });

    alert("Thank you for subscribing!");
    document.getElementById("newsletterForm").reset();
  } catch (error) {
    console.error("Error saving data:", error);
    alert("Something went wrong. Please try again.");
  }
});
