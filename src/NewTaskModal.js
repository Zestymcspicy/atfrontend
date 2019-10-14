import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [longTermGoal, setLongTermGoal] = useState(false);

  const toggleIsLongTerm = () => setLongTermGoal(!longTermGoal);


  const sendTask = () => {
    props.toggleModal();    
    console.log(longTermGoal);
    // let goalTerm = longTermGoal?true:false;
    fetch('http://localhost:5000/tasks/add', {
      method: 'POST',
      body: JSON.stringify({
        name: taskName,
        longTermGoal: longTermGoal,
        user_id: props.user._id,
        completed: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      let repUser = props.user;
      repUser.tasks.push(data);
      return props.setUser(repUser);
    });
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
            type="checkbox"
            />
          <span className="slider"></span>
        </label>
        {longTermGoal?<span>Long term</span>:<span>Weekly</span>}
      </div>
      <button onClick={sendTask}>OK</button>
    </div>
  )
}
