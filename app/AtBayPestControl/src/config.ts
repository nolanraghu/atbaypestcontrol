import Firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBwzg4LZy9hyyzD6xWevqoPwj-Ida_JFes",
    authDomain: "atbaypestcontrol-acd63.firebaseapp.com",
    databaseURL: "https://atbaypestcontrol-acd63.firebaseio.com",
    projectId: "atbaypestcontrol-acd63",
    storageBucket: "atbaypestcontrol-acd63.appspot.com",
    messagingSenderId: "125544518066",
    appId: "1:125544518066:web:745174847e790de6e214ab",
    measurementId: "G-N5WGG4MXND"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();