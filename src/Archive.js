import React from 'react';
import TaskCard from './TaskCard';
import {useHistory} from 'react-router-dom';


export default function Archive(props) {

  const history = useHistory();
  if(props.user==undefined){
    history.push('/')
  }

  return(
    <div>
    <h2>Archive</h2>
    <ol>
    {props.user.tasks.filter(x => x.completed===true).map( task => {
      return (<li key={task._id}>
                <TaskCard task={task} updateTaskAndUser={props.updateTaskAndUser}/>
              </li>)
    })
  }
    </ol>
    </div>
  )
}
