import React from 'react';

export default function TaskCard(props){

  return(
    <div className="TaskCard">
      <p>{props.task.name}</p>
      <div className="arrowLine1"></div>
      <div className="arrowLine2"></div>
    </div>
  )
}
