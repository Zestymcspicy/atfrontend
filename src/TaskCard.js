import React, { useState } from 'react';

export default function TaskCard(props){

  //change state back to false
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => setCompleted(!completed);
  const toggleExpanded = () => setExpanded(!expanded);

  const updateTask = e => {
    toggleExpanded();
    setCompleted(false);
    e.preventDefault();
    let repTask = props.task
    repTask.completed=completed;
    props.updateTaskAndUser(repTask)
    console.log(repTask)
    console.log(props.task)
  }

  const upOrDown = expanded?"Up":"Down";


  return(
    <div className="TaskCard">
    <div className="CardTop">
      <p>{props.task.name}</p>
      <p>{props.task.dueDate && new Date(props.task.dueDate).toDateString()}</p>
      <div
      onClick={toggleExpanded}
      className="ArrowBox">
      <i
      className={`Arrow ${upOrDown}`}></i>
      </div>
    </div>
      {expanded &&
      <div className="CardBottom">
      <form onSubmit={updateTask}>
        <label>
          Completed?
          <input
          value={completed}
          onClick={toggleCompleted}
          type="checkbox"
          id="CompletedCheck" />
        </label>
        <input type="submit" value="Submit"></input>
      </form>
      </div>}
    </div>
  )
}
