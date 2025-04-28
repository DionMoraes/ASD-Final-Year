import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDLPdpOaWCeaGQPAINhx8wC9lIHyCIfsXg",
  authDomain: "autism-spectrum-disorder-b3472.firebaseapp.com",
  projectId: "autism-spectrum-disorder-b3472",
  storageBucket: "autism-spectrum-disorder-b3472.appspot.com", 
  messagingSenderId: "428398124281",
  appId: "1:428398124281:web:fc9a620e430b8560025628",
  measurementId: "G-R45V7HMDZF", 
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app); 
const storage = getStorage(app); 

export { app, auth, db, storage };
