import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import {
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// --- Sign Up ---
export async function registerUser(email, password, name) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store user data in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      createdAt: new Date().toISOString(),
      uid: user.uid
    });

    console.log("User registered and data stored:", user.uid);
    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// --- Login ---
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Fetch user data from Firestore
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return { user, userData: docSnap.data() };
    } else {
      console.log("No such document!");
      return { user, userData: null };
    }
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// --- Logout ---
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

// --- Auth State Observer ---
export function monitorAuthState(callback) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      // Optionally fetch data here if needed globally
    } else {
      // User is signed out
    }
    if (callback) callback(user);
  });
}
