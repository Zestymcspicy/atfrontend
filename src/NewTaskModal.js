import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [longTermGoal, setLongTermGoal] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const today = new Date();

  useEffect(() => {
    var shortDueDate = new Date();
    // if(d.getDay()<=1){
    //   d.setDate(d.getDate() + (1 + 7 - d.getDay()));
    // } else {
    //   d.setDate(d.getDate() + (1 + 14 - d.getDay()));
    // }
    let day = shortDueDate.getDay();
    if(day===1){
      shortDueDate.setDate(shortDueDate.getDate()+7);
    }
    if(day===0){
      shortDueDate.setDate(shortDueDate.getDate()+8);
    }
    if(day>1){
      shortDueDate.setDate(shortDueDate.getDate()+15-day);
    }
    shortDueDate=shortDueDate.toDateString()
    console.log(shortDueDate)
    setDueDate(shortDueDate);
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
    return fetch(`${props.url}tasks/add`, {
    // return fetch('http://localhost:5000/tasks/add', {
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
