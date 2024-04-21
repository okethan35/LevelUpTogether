import { useState } from 'react';
import appLogo from './assets/LevelUp_Together.png'; // Ensure the path is correct
import './App.css'; // Ensure the path is correct

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyCpz8slD9gpJTBf38K7JmtYFpgHcvniLBs",
  authDomain: "leveluptogether-e7502.firebaseapp.com",
  projectId: "leveluptogether-e7502",
  storageBucket: "leveluptogether-e7502.appspot.com",
  messagingSenderId: "403257475271",
  appId: "1:403257475271:web:f3c070a6eef7abc6697ee2",
  measurementId: "G-WKXMXEZZPK"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);


function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [reps, setReps] = useState(''); // Initialized reps state
  const [sets, setSets] = useState('');
  const [dateUser, setDate] = useState('');
  const [lastSubmitted, setLastSubmitted] = useState(null); // Ensure this is correctly initialized

  const workouts = [
    { id: 'squats', name: 'Squats' },
    { id: 'deadlift', name: 'Dead Lift' },
    { id: 'curl', name: 'Curls' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'userFName') {
      setFirstName(value);
    } else if (name === 'userLName') {
      setLastName(value);
    } else if (name === 'reps') {
      setReps(Math.max(0, value)); // Handle change for reps
    } else if (name === 'sets') {
      setSets(Math.max(0, value));
    } else if (name === 'date') {
      setDate(value);
    }
  };

  const handleWorkoutChange = (event) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedWorkouts(selectedOptions);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const submissionData = {
      userFName: firstName,
      userLName: lastName,
      selectedWorkouts: selectedWorkouts,
      reps: reps,
      sets: sets,
      date: dateUser
    };

    setLastSubmitted(submissionData); // Store last submission data
    console.log('Submitted:', submissionData); // Ensure console logging is correct

    setDoc(doc(db, "users", "user2", "userData", "" + submissionData.date + "", "weight", "" + submissionData.selectedWorkouts + ""), {
      sets: submissionData.sets,
      reps: submissionData.reps
    });

    // Reset form fields
    setFirstName('');
    setLastName('');
    setSelectedWorkouts([]);
    setReps(''); // Reset reps field
    setSets('');
    setDate('');
  };

  return (
    <div className='scrolling'>
      <div className='logo'>
        <img src={appLogo} alt="Level Up Together Logo" />
      </div>
      <h1 className='title'>Welcome!</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <br />
          <input name="userFName" type="text" value={firstName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Last Name:
          <br />
          <input name="userLName" type="text" value={lastName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Select your workout:
          <br />
          <select multiple value={selectedWorkouts} onChange={handleWorkoutChange}>
            {workouts.map(workout => (
              <option key={workout.id} value={workout.name}>{workout.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Rep(s):
          <br />
          <input name="reps" type="number" value={reps} onChange={handleChange} />
        </label>
        <br />
        <label>
          Set(s):
          <br />
          <input name="sets" type="number" value={sets} onChange={handleChange} />
        </label>
        <br/>
        <label>
          Date:
          <br />
          <input name="date" type="text" value={dateUser} onChange={handleChange} />
        </label>
        <br />
        <br/>
        <button type="submit">
          Submit
        </button>
      </form>
      {lastSubmitted && (
        <div>
          <h3>Last Submission:</h3>
          <p>First Name: {lastSubmitted.userFName}</p>
          <p>Last Name: {lastSubmitted.userLName}</p>
          <p>Workouts: {lastSubmitted.selectedWorkouts ? lastSubmitted.selectedWorkouts.join(', ') : ""}</p>
          <p>Reps: {lastSubmitted.reps}</p> {/* Display the reps in the last submission */}
        </div>
      )}
    </div>
  );
}

export default App;
