import React, {useState} from 'react';

export default function Profile(props){
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    let repUser = props.user;
    repUser.tasks.push(newTask);
    props.setUser(repUser);
    setNewTask("");
  }

  return(
    <div>
    <h2>Hello {props.user.name}</h2>
    <input
    onChange={e => setNewTask(e.target.value)}
    value={newTask}
    type="text"></input>
    <button onClick={addTask}>AddTask</button>
    <ol>
    {props.user.tasks.map(task => <li>{task}</li> )}
    </ol>
    </div>
  )
}
