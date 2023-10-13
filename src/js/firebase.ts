// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD2woEv_8SYAyoQrox8AONUeP3h4EzAbIs',
  authDomain: 'timetracker-8bfc7.firebaseapp.com',
  projectId: 'timetracker-8bfc7',
  storageBucket: 'timetracker-8bfc7.appspot.com',
  messagingSenderId: '3968833094',
  appId: '1:3968833094:web:10e7041baba5147d77dc47'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
