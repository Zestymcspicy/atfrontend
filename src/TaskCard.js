import React, { useState } from 'react';

export default function TaskCard(props){

  //change state back to false
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(props.task.completed);

  const toggleCompleted = () => setCompleted(!completed);
  const toggleExpanded = () => setExpanded(!expanded);
  let dueDateString = "";
  if(props.task.dueDate){
    dueDateString = new Date(props.task.dueDate).toDateString()
  }
  const updateTask = e => {
    e.preventDefault();
    let repTask = props.task
    repTask.completed=completed;
    props.updateTaskAndUser(repTask)
    toggleExpanded();
    setCompleted(false);
    console.log(repTask)
    console.log(props.task)
  }

  const upOrDown = expanded?"Up":"Down";

  const styles = {
    submitHelper: {
      marginLeft: "50%",
      marginBottom: "10px"
    }
  }
  return(
    <div className="TaskCard">
    <div className="CardTop">
      <p>{props.task.name}</p>
      <p>{dueDateString}</p>
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
          checked={completed}
          onChange={toggleCompleted}
          type="checkbox"
          id="CompletedCheck" />
        </label>
        <input
          style={styles.submitHelper}
          type="submit"
          value="Submit"
          className="StandardButton"/>
      </form>
      </div>}
    </div>
  )
}
