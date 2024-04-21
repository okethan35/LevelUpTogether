import { useState } from 'react';
import appLogo from './assets/LevelUp_Together.png'; // Ensure the path is correct
import './App.css'; // Ensure the path is correct

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
    const submissionData = { firstName, lastName, selectedWorkouts, reps, sets, date }; // Include reps in submission data
    setLastSubmitted(submissionData); // Store last submission data
    console.log('Submitted:', submissionData); // Ensure console logging is correct
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
          <p>First Name: {lastSubmitted.firstName}</p>
          <p>Last Name: {lastSubmitted.lastName}</p>
          <p>Workouts: {lastSubmitted.selectedWorkouts.join(', ')}</p>
          <p>Reps: {lastSubmitted.reps}</p> {/* Display the reps in the last submission */}
        </div>
      )}
    </div>
  );
}

export default App;
