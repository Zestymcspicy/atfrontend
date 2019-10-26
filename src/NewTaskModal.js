import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [longTermGoal, setLongTermGoal] = useState(false);
  const [dueDate, setDueDate] = useState();
  const today = new Date(Date.now()).toDateString();

  useEffect(() => {
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    d=d.toDateString()
    console.log(d)
    setDueDate(d);
  }, [setDueDate])

  const toggleIsLongTerm = () => {
    setLongTermGoal(!longTermGoal)
    if(!longTermGoal){
    }
  };

  const dueDateChange = e => {
    console.log(e.target.value)
    setDueDate(e.target.value)
  };

  const sendTask = () => {

    // console.log(longTermGoal);
    // let goalTerm = longTermGoal?true:false;
    // return fetch('https://activity-tracker-hearthstone.herokuapp.com/tasks/add', {
    return fetch('http://localhost:5000/tasks/add', {
      method: 'POST',
      body: JSON.stringify({
        name: taskName,
        longTermGoal: longTermGoal,
        user_id: props.user._id,
        dueDate: dueDate,
        completed: false
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      let repUser = props.user;
      repUser.tasks.push(data);
      console.log(data);
      props.setUser(repUser);
      props.toggleModal();
    });
  }




  return(
    <div className="NewTaskModal">
    <span
    className="CloseButton"
    onClick={props.toggleModal}>&#215;</span>
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
      {longTermGoal &&
        <>
        <span>Due Date</span>
        <input
          min={today}
          type="date"
          value={dueDate}
          onChange={e=>dueDateChange(e)}/>
        </>
      }
      <button
        className="StandardButton"
        onClick={sendTask}>OK</button>
    </div>
  )
}
