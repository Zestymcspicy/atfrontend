import React, { useState, useEffect } from 'react';

export default function NewTaskModal(props) {

  const [taskName, setTaskName] = useState("");
  const [newTask, setNewTask] = useState({});

  const handleNameChange = e => {
    setTaskName(e.target.value)
    setNewTask({
      name: taskName
    })
  }

  const addTask = () => {
    let repUser = props.user;
    repUser.tasks.push(newTask);
    props.setUser(repUser);
    setNewTask("");
    props.toggleModal();
  }

  const click = async() => {

    addTask()
  }

  return(
    <div>
      <input
      value={taskName}
      onChange={e => handleNameChange(e)}
      type="text"></input>
      <button onClick={click}>OK</button>
    </div>
  )
}
