// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc, connectFirestoreEmulator, query, getDocs, setDoc, doc, deleteDoc, onSnapshot, querySnapshot, handleLogout } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBggbyvWgM57WedVOyXuhWBqUB7dJ55e9M",
  authDomain: "fir-paglinawan.firebaseapp.com",
  projectId: "fir-paglinawan",
  storageBucket: "fir-paglinawan.appspot.com",
  messagingSenderId: "713900004451",
  appId: "1:713900004451:web:2bbf9809e8f66b35ee9456",
  measurementId: "G-J7QHKVR7ZC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
console.log(app)

const signOutButton = document.querySelector('.sign-out');
signOutButton.addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('User signed out successfully');
    window.location.href = 'index.html';
  }).catch((error) => {
    console.log(error.message);
  });
})

const googleSignInButton = document.querySelector('.google-sign-in');
const googleprovider = new GoogleAuthProvider();
const auth = getAuth(app);

googleSignInButton.addEventListener('click', () => {
  signInWithPopup(auth, googleprovider).then((result) => {
    const user = result.user;
    alert(`Hello ${user.displayName}`);
    window.location.href = 'home.html';
  }).catch((error) => {
    const errorMessage = error.message;
    alert(`Error: ${errorMessage}`);
  });
});

const facebookprovider = new FacebookAuthProvider();
const facebookSignInButton = document.querySelector('.facebook-sign-in');
facebookSignInButton.addEventListener('click', () => {
  signInWithPopup(auth, facebookprovider).then((result) => {
    const user = result.user;
    alert(`Hello ${user.displayName}`);
    window.location.href = 'home.html';
    }).catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});

const epSignInBtn = document.querySelector('.ep-sign-in');
epSignInBtn.addEventListener('click', () => {
  const email = "test@email.com";
  const password = "test1234";

  signInWithEmailAndPassword(auth, email, password).then((result) => {
    const user = result.user;
    alert(`Hello, you signed in with email and passoword`);
    window.location.href = 'home.html';
}).catch((error) => {
  const errorMessage = error.message;
  alert(`Error: ${errorMessage}`);
})
})


/*
onAuthStateChanged(auth, (user) => {
  if (user) {
    //alert(`User is signed in`);
    window.location.href = 'login.html';
  } else {
    alert('You are not signed in');
    //window.location.href = 'index.html';
  }
})*/

const db = getFirestore(app);
connectFirestoreEmulator(db,'localhost', 8080);

const saveBtn = document.querySelector('.save');
saveBtn.addEventListener('click', async () => {
  const fruitcollectionRef = collection(db, 'fruits')
  try {
    const newFruitRef = await addDoc(fruitcollectionRef, {
    name: 'Apple',
    color: 'red',
    size: 'small'
    })
    console.log(`Created a new fruit: ${newFruitRef.id}`)
  } catch (error) {
    console.log(error)

  }
})

const getDataBtn = document.querySelector('.get-data');
getDataBtn.addEventListener('click', async () => {
  const q = query(collection(db, 'fruits'))
  const fruits = await getDocs(q)
  fruits.forEach((fruit) => {
    console.log(fruit.data())
  })
})

const changeDataBtn = document.querySelector('.change-data')
changeDataBtn.addEventListener('click', async () => {
  const q = query(collection(db, 'fruits'))
  const fruits = await getDocs(q)
  if(fruits.empty){
    console.log('No data to change yet')
    return
  }

  await setDoc(doc(db, 'fruits', fruits.docs[0].id), {
    name: 'Banana',
    color: 'yellow',
    size: 'long'
  }, { merge: true })
})

const deleteDataBtn = document.querySelector('.delete-data')
deleteDataBtn.addEventListener('click', async () => {
  const q = query(collection(db, 'fruits'))
  const fruits = await getDocs(q)
  if(fruits.empty){
    console.log('No data to delete yet')
    return
  }

  await deleteDoc(doc(db, 'fruits', fruits.docs[fruits.docs.length-1].id))
  console.log(`Deleted successfully!`)
})

const q = query(collection(db, 'fruits'))

const unsubscribe = onSnapshot(q, (querySnapshot) => {
 console.log(`----------------------------------------------------`)
 querySnapshot.forEach(fruit => {
  console.log(fruit.data())
 })
})

// unsubscribe()
