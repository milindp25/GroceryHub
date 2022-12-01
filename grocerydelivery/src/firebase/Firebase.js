import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/storage';
import { firebase  } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBB6qRFFQIgERXQl4NVHgSYlXpYz09X3Jo",
    authDomain: "groceryhub-images.firebaseapp.com",
    projectId: "groceryhub-images",
    storageBucket: "groceryhub-images.appspot.com",
    messagingSenderId: "663934933198",
    appId: "1:663934933198:web:7b315e95c0a70298b5589f",
    measurementId: "G-PBZ2YC8FGY"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const storage = getStorage(app);