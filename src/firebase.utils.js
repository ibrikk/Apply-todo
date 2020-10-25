import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDlxZkL4xRHhXH32IQoOkL79ToUfnRgCjA",
    authDomain: "todo-app-f7c1a.firebaseapp.com",
    databaseURL: "https://todo-app-f7c1a.firebaseio.com",
    projectId: "todo-app-f7c1a",
    storageBucket: "todo-app-f7c1a.appspot.com",
    messagingSenderId: "43702521392",
    appId: "1:43702521392:web:c880e891cfad8c3eb8a7f5",
    measurementId: "G-E0NWCML731"
});

const db = firebaseApp.firestore();

export default db;