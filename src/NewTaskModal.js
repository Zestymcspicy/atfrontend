import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [newTask, setNewTask] = useState({});



  const addTask = () => {
    let repUser = props.user;
    repUser.tasks.push({name: taskName});
    props.setUser(repUser);
    // setNewTask("");
    props.toggleModal();
  }

  // const click = () => {
  //   setNewTask({name: taskName})
  //   addTask()
  // }

  return(
    <div>
      <input
      value={taskName}
      onChange={e => setTaskName(e.target.value)}
      type="text"></input>
      <button onClick={addTask}>OK</button>
    </div>
  )
}
