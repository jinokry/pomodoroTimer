import React, { useState, useEffect } from "react";
import "./style.css";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(10); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);
  const [projectCount, setProjectCount] = useState(1);
  const [projectName, setProjectName] = useState("");
  const [projects,setProjects] = useState([]);

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    
    if (projectName.trim() === "") return;

    setProjects([...projects, { id: projectCount, name: projectName, session: sessionCount }]);

    setProjectCount(projectCount + 1);

    setProjectName("");
  }

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setSessionCount(sessionCount +1);
      setTimeLeft(1500);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      setProjectCount(projectCount +1);
      setTimeLeft(1500);
    }
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      alert("Time is up!");
      setTimeLeft(1500); 
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };


  return (
    
    <div className="container">
      <h1 className="title">Pomodoro Timer</h1>
      <p className="timer">{formatTime(timeLeft)}</p>
      <div className="button-wrapper">
      <button className="btn start-btn" onClick={() => setIsRunning(true)}>Start</button>
      <button className="btn stop-btn" onClick={() => setIsRunning(false)}>Stop</button>
      <button className="btn reset-btn" onClick={() => { setIsRunning(false); setTimeLeft(1500); }}>Reset</button>
    </div>
    
    <div className="name">
      <form onSubmit={handleSubmission}>
        <div className="project-form">
          <label>Task:</label>
          <input id = "projectName" type="text" value={projectName} onChange={handleNameChange} className="project-input" />
        </div>
      <button className="btn submit-btn">Submit</button>
      </form>
    </div>

    <div className="session">
      <h2>Sessions: </h2>
      <p>Session {sessionCount}: 25:00 minutes</p>
    </div>

    <div className="project-container">
      <h3>Project:</h3>
      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              Project {project.session}: {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>

    </div>
  );
};
export default PomodoroTimer;
