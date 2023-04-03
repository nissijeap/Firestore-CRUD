// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, connectFirestoreEmulator, query, getDocs, getDoc, setDoc, doc, deleteDoc, onSnapshot, querySnapshot } from "firebase/firestore";
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

const db = getFirestore(app);
connectFirestoreEmulator(db,'localhost', 8080);

const saveBtn = document.querySelector('.save');
saveBtn.addEventListener('click', async () => {
  const name = document.getElementById('name').value;
  const idnum = document.getElementById('idnum').value;
  const department = document.getElementById('department').value;
  const year = document.getElementById('year').value;

  const studentcollectionRef = collection(db, 'students')
  try {
    const newStudentRef = await addDoc(studentcollectionRef, {
      name: name,
      idnum: idnum,
      department: department,
      year: year,
    })
    alert(`Successfully added a new student!`)
    console.log(`Created a new student: ${newStudentRef.id}`)
  } catch (error) {
    console.log(error)
  }
})

const getDataBtn = document.querySelector('.get-data');
const tableBody = document.querySelector('#table-body');

getDataBtn.addEventListener('click', async () => {
  const q = query(collection(db, 'students'))
  const students = await getDocs(q)
  tableBody.innerHTML = '';
  students.forEach((student) => {
    const data = student.data();
    const row = `
      <tr>
        <th>${data.name}</th>
        <th>${data.idnum}</th>
        <th>${data.department}</th>
        <th>${data.year}</th>
        <th><button class="change-data" data-id="${student.id}" style="width: 40%; height: 30px; background: green; color: white">Update</button>
        <button class="delete-data" data-id="${student.id}" style="width: 40%; height: 30px; background: red; color: white">Delete</button></th>
      </tr>
    `;
    tableBody.insertAdjacentHTML('beforeend', row);
  })

  // Attach event listeners to the newly created buttons
  const changeDataBtns = document.querySelectorAll('.change-data');
  changeDataBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const q = query(collection(db, 'students'));
      const studentId = btn.dataset.id;
      const docRef = doc(db, 'students', studentId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const newName = prompt(`Enter new NAME for student: ${data.name}`, data.name);
        if (newName !== null) {
          const newIdnum = prompt(`Enter new ID NUMBER for student: ${data.idnum}`, data.idnum);
          const newDepartment = prompt(`Enter new DEPARTMENT for student: ${data.department}`, data.department);
          const newYear = prompt(`Enter new YEAR for student: ${data.year}`, data.year);
          try {
            await setDoc(docRef, {
              name: newName,
              idnum: newIdnum,
              department: newDepartment,
              year: newYear,
            }, { merge: true });
            alert(`Successfully updated student details.`);
          } catch (error) {
            console.log(error);
          }
        }
      }
    });
  });

  const deleteDataBtns = document.querySelectorAll('.delete-data');
  deleteDataBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const studentId = btn.dataset.id;
      const confirmed = confirm(`Are you sure you want to delete student with id: ${studentId}`);
      if (confirmed) {
        try {
          await deleteDoc(doc(db, 'students', studentId));
          console.log(`Deleted student with id: ${studentId}`);
          alert(`Student successfully deleted!`);
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
})

const q = query(collection(db, 'students'))

const unsubscribe = onSnapshot(q, (querySnapshot) => {
 console.log(`----------------------------------------------------`)
 querySnapshot.forEach(student => {
  console.log(student.data())
 })
})

// unsubscribe()

