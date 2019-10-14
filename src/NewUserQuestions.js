import React, { useState } from 'react';

export default function NewUserQuestions() {
  const [newUserTasks, setNewUserTasks] = useState([]);
  const [idList, setIdList] = useState(["Driver's License", "State Issued ID", "Social Security Card", "Birth Certificate"]);
  const addNewUserTotalTasks = () => {

  }

  let taskList = ["Get Peasley Evaluation"];
  const handleIDchange = e => {
    let target = e.target;
    let value = target.value
    console.log(target.checked)
    // target.checked=!target.checked;
    if(value==='none'){
      if(target.checked){
      setIdList(["Driver's License", "State Issued ID", "Social Security Card", "Birth Certificate"]);
      document.querySelectorAll(".idCheckBox").forEach(x=>x.checked=false);
      }
    } else {
      let newIdList = idList;
      if(target.checked){
        if(newIdList.indexOf(value)!==-1){
          newIdList = newIdList.filter(x=> x!==value)
        }
      } else {
        newIdList.push(value)
      }
      setIdList(newIdList);
    }
  }

  return(
    <div>
      <form name="newUserQuestionForm"
      onSubmit={addNewUserTotalTasks}>
      <p>What forms of ID do you have?</p>
      <div>
        Driver's License
        <input type="checkbox"
        className="idCheckBox"

        onChange={handleIDchange}
        value="Driver's License"></input>
      </div>
      <div>
        State Issued ID
        <input type="checkbox"
        className="idCheckBox"

        onChange={handleIDchange}
        value="State Issued ID"></input>
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

        onChange={handleIDchange}
        value="none"></input>
      </div>
      </form>
    </div>
  )
}
