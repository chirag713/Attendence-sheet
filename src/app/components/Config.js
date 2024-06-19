
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA43uY1ZsbpsKjgDoMuxdkoxWckdk4wQ0M",
  authDomain: "imageuploaddb-a2bad.firebaseapp.com",
  projectId: "imageuploaddb-a2bad",
  storageBucket: "imageuploaddb-a2bad.appspot.com",
  messagingSenderId: "516025404312",
  appId: "1:516025404312:web:432fdf0cad53b84d5ef9ed"
};

const app = initializeApp(firebaseConfig);

export const imageDb = getStorage(app)