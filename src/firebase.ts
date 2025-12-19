// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8wcMEnNeZQQaEMGY3NI_XwOT-wQ1658U",
  authDomain: "deweddingfactory-5ecd8.firebaseapp.com",
  projectId: "deweddingfactory-5ecd8",
  storageBucket: "deweddingfactory-5ecd8.firebasestorage.app",
  messagingSenderId: "988892514281",
  appId: "1:988892514281:web:0a1fbf9ea1686601a1ed78",
  measurementId: "G-P6M3ZXT4QQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const auth = getAuth(app);        // For login/logout
export const db = getFirestore(app);     // For storing blog posts
export const storage = getStorage(app);  // For uploading images
export { analytics };                    // For analytics
