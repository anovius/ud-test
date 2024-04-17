// firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCthDKs2WCcaGq8Qj4d8EzxO29Uv4uLmRA",
    authDomain: "ud-test-f2ae9.firebaseapp.com",
    projectId: "ud-test-f2ae9",
    storageBucket: "ud-test-f2ae9.appspot.com",
    messagingSenderId: "1038698894838",
    appId: "1:1038698894838:web:81ccb3ad3cbdb0c4a4e3d7",
    measurementId: "G-YK4BJTC9BG"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
