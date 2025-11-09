// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB-KthH4PwPSizzciT1A7MOj4aNA0ArVzE",
//   authDomain: "framez-hng.firebaseapp.com",
//   projectId: "framez-hng",
//   storageBucket: "framez-hng.firebasestorage.app",
//   messagingSenderId: "768371327009",
//   appId: "1:768371327009:web:e64cf2977da9404694e360",
//   measurementId: "G-45DTDVM2D1"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-KthH4PwPSizzciT1A7MOj4aNA0ArVzE",
  authDomain: "framez-hng.firebaseapp.com",
  projectId: "framez-hng",
  storageBucket: "framez-hng.firebasestorage.app",
  messagingSenderId: "768371327009",
  appId: "1:768371327009:web:e64cf2977da9404694e360",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
