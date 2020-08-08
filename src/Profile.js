import React, {useState} from 'react';
import TaskCard from './TaskCard.js';
import NewTaskModal from './NewTaskModal.js';
import { useHistory } from 'react-router-dom';

export default function Profile(props){
  // const [newTask, setNewTask] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [weekly, setWeekly] = useState(true);

  const toggleModal = () => setModalOpen(!modalOpen);

  const setToWeekly = () => setWeekly(true);
  const setToLongTerm = () => setWeekly(false);

  const weeklyActive = weekly?"activeTab":"inactiveTab";
  const longTermActive = weekly?"inactiveTab":"activeTab";
  const history = useHistory()
  if(props.focusedUser===false){
    history.push('/');
  }


  return(
    <div>
    <h2>{props.focusedUser.name}</h2>
    {modalOpen &&
      <NewTaskModal
      url={props.url}
      setUser={props.setFocusedUser}
      user={props.focusedUser}
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
    {props.focusedUser.tasks.filter(x => x.longTermGoal===!weekly).filter(x => x.completed!==true).map((task, index) => {
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
