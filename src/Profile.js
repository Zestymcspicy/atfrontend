import React, {useState} from 'react';
import TaskCard from './TaskCard.js';
import NewTaskModal from './NewTaskModal.js';

export default function Profile(props){
  // const [newTask, setNewTask] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [weekly, setWeekly] = useState(true);

  const toggleModal = () => setModalOpen(!modalOpen);

  const setToWeekly = () => setWeekly(true);
  const setToLongTerm = () => setWeekly(false);

  const weeklyActive = weekly?"activeTab":"inactiveTab";
  const longTermActive = weekly?"inactiveTab":"activeTab";


  return(
    <div>
    <h2>Hello {props.user.name}</h2>
    {modalOpen &&
      <NewTaskModal
      setUser={props.setUser}
      user={props.user}
      toggleModal={toggleModal}/>
    }
    <button
      className="StandardButton"
      onClick={toggleModal}>
      AddTask</button>
    <div className="GoalBox">
    <div onClick={setToWeekly} className={`${weeklyActive} TaskTab`}>
    Weekly
    <div></div>
    </div>
    <div onClick={setToLongTerm} className={`${longTermActive} TaskTab`}>
    Long Term
    <div></div>
    </div>
    <div className="ListBox">
    <ol>
    {props.user.tasks.filter(x => x.longTermGoal===!weekly && !x.completed).map((task, index) => {
      return (<li style={{listStyleType:"none"}} key={index}>
        <TaskCard updateTaskAndUser={props.updateTaskAndUser} task={task}/>
        </li>)
    } )}
    </ol>
    </div>
    </div>
    </div>
  )
}
