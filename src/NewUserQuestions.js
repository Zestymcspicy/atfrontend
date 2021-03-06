import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function NewUserQuestions(props) {
  const [newUserTasks, setNewUserTasks] = useState([]);
  const [longTerm, setlongTerm] = useState(["Go to Peasley Center", "Driver's License or State Issued ID", "Social Security Card", "Birth Certificate"]);
  const history = useHistory();
  const addNewUserTotalTasks = e => {
    e.preventDefault()
    return fetch(`${props.url}tasks/addmultiple`, {
    // return fetch('http://localhost:5000/tasks/addmultiple', {
      method: "POST",
      body: JSON.stringify({
        user_id: props.user._id,
        weeklies: newUserTasks,
        longTerms: longTerm,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(data => {
      props.setFocusedUser(data)
      props.setUser(data)
      history.push(`/profile/`)
    })
  }

  const handleIDchange = e => {
    let target = e.target;
    let value = target.value
    console.log(target.checked)
    // target.checked=!target.checked;
    if(value==='none'){
      if(target.checked){
      setlongTerm(["Driver's License or State Issued ID", "Social Security Card", "Birth Certificate"]);
      document.querySelectorAll(".idCheckBox").forEach(x => x.checked = false);
      }
    } else {
      let newlongTerm = longTerm;
      if(target.checked){
        if(newlongTerm.indexOf(value)!==-1){
          document.getElementById('noId').checked = false;
          newlongTerm = newlongTerm.filter(x=> x!==value)
        }
      } else if(newlongTerm.indexOf(value)===-1) {
        newlongTerm.push(value)
      }
      setlongTerm(newlongTerm);
    }
  }

  const addToTaskList = e => {
    let value = e.target.value;
    console.log(value);
    // let newTaskList = newUserTasks
    if(newUserTasks.indexOf(value)===-1){
      // newTaskList.push(value);
      setNewUserTasks([...newUserTasks, value]);
    }
  }

  const addToLongTerm = e => {
    let value = e.target.value;
    console.log(value);
    // let newTaskList = newUserTasks
    if(longTerm.indexOf(value)===-1){
      // newTaskList.push(value);
      setlongTerm([...longTerm, value]);
    }
  }

  const removeFromTaskList = e => {
    let value=e.target.value
    let newTaskList;
    newTaskList = newUserTasks.filter( x => x !== value)
    setNewUserTasks(newTaskList);
  }

  const removeFromLongTerm = e => {
    let value=e.target.value
    let newLongTerm;
    newLongTerm = longTerm.filter( x => x !== value)
    setlongTerm(newLongTerm);
  }

  return(
    <div>
      <form name="newUserQuestionForm"
      onSubmit={addNewUserTotalTasks}>
      <p>What forms of ID do you have?</p>
      <div>
      Driver's License or State Issued ID
        <input type="checkbox"
        className="idCheckBox"
        onChange={handleIDchange}
        value="Driver's License or State Issued ID"></input>
      </div>
      <div>
        Birth Certificate
        <input type="checkbox"
        className="idCheckBox"
        onChange={handleIDchange}
        value="Birth Certificate"></input>
      </div>
      <div>
        Social Security Card
        <input type="checkbox"
        className="idCheckBox"
        onChange={handleIDchange}
        value="Social Security Card"></input>
      </div>
      <div>
        None
        <input type="checkbox"
        id="noId"
        onChange={handleIDchange}
        value="none"></input>
      </div>
      <div>
        <p>Are you employed?</p>
        Yes<input type="radio"
        value="Get a job"
        onChange={removeFromTaskList}
        name="employment"></input>
        No<input type="radio"
        value="Get a job"
        onChange={addToTaskList}
        name="employment"></input>
      </div>
      <div>
      <p>Do you have a home group?</p>
      Yes<input type="radio"
      value="Find a home group"
      onClick={removeFromTaskList}
      name="homeGroup"></input>
      No<input type="radio"
      value="Find a home group"
      onClick={addToTaskList}
      name="homeGroup"></input>
      </div>
      <div>
      <p>Do you have a sponsor?</p>
      Yes<input type="radio"
      value="Get a sponsor"
      onClick={removeFromTaskList}
      name="sponsor"></input>
      No<input type="radio"
      value="Get a sponsor"
      onClick={addToTaskList}
      name="sponsor"></input>
      </div>
      <div>
      <p>Are you on paper?</p>
      Yes<input type="radio"
      value="Get off paper"
      onClick={addToLongTerm}
      name="paper"></input>
      No<input type="radio"
      value="Get off paper"
      onClick={removeFromLongTerm}
      name="paper"></input>
      </div>
      <div>
      <p>Do you have a primary care physician?</p>
      Yes<input type="radio"
      value="Get a primary care physician"
      onClick={removeFromLongTerm}
      name="physician"></input>
      No<input type="radio"
      value="Get a primary care physician"
      onClick={addToLongTerm}
      name="physician"></input>
      </div>
      <input

        className="StandardButton"
        type="submit"
        value="Submit"></input>
      </form>
    </div>
  )
}
