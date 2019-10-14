import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [isLongTerm, setIsLongTerm] = useState(false);

  const toggleIsLongTerm = () => setIsLongTerm(!isLongTerm);

  const sendTask = task => {
    fetch('http://localhost:5000/tasks/add', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      console.log(data);
      return addTaskToCurrentUser(data)
    });
  }

  const addTaskToCurrentUser = task => {
    let repUser = props.user;
    repUser.tasks.push(task);
    props.toggleModal();    
    return props.setUser(repUser);
  }

  // useEffect(() => {
  //   props.setUser(props.user);
  // }, [props, props.user, props.setUser])

  const addTask = () => {
    let newTask = {
      name: taskName,
      longTermGoal: isLongTerm,
      user_id: props.user._id,
      completed: false
    };
    sendTask(newTask);
  }

  return(
    <div className="NewTaskModal">
      <div>
        <span>Goal Name</span>
        <input
        className="taskNameInput"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        type="text"></input>
      </div>
      <div className="LongTermSwitchBox">
        <span>Weekly or Long Term Goal</span>
        <label className="switch">
          <input
            onChange={toggleIsLongTerm}
            value={isLongTerm}
            type="checkbox"
            />
          <span className="slider"></span>
        </label>
        {isLongTerm?<span>Long term</span>:<span>Weekly</span>}
      </div>
      <button onClick={addTask}>OK</button>
    </div>
  )
}
