import React from 'react';
import TaskCard from './TaskCard';


export default function Archive(props) {

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
