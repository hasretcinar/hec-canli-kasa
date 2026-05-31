// Demode TV Canlı Kasa Firebase ayarları
// Bu dosya oyunu Firebase Realtime Database'e bağlar.

const firebaseConfig = {
  apiKey: "AIzaSyA4gQzsKcBndaS-cxV-9bTkKSOUg05DTKg",
  authDomain: "demodetv-milyonpara.firebaseapp.com",
  databaseURL: "https://demodetv-milyonpara-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "demodetv-milyonpara",
  storageBucket: "demodetv-milyonpara.firebasestorage.app",
  messagingSenderId: "202786955471",
  appId: "1:202786955471:web:1e4789caae9cb0c66197ba"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
