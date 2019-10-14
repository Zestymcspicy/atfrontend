import React, {useState} from 'react';
import TaskCard from './TaskCard.js';
import NewTaskModal from './NewTaskModal.js';

export default function Profile(props){
  // const [newTask, setNewTask] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);


  return(
    <div>
    <h2>Hello {props.user.name}</h2>
    {modalOpen &&
      <NewTaskModal
      setUser={props.setUser}
      user={props.user}
      toggleModal={toggleModal}/>
    }
    <button onClick={toggleModal}>AddTask</button>
    <ol>
    {props.user.tasks.map((task, index) => {
      return (<li key={index}>
        <TaskCard task={task}/>
        </li>)
    } )}
    </ol>
    </div>
  )
}
