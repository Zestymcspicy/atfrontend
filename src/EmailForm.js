import React, { useState } from "react";


export default function EmailForm(props) {

  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [passwordMatch, setPasswordMatch] = useState(false)
  const [isNew, setIsNew] = useState(false)

  const toggleIsNew = () => {
    setIsNew(!isNew);
  }

  const checkPassword2 = e => {
    password===e.target.value?
    setPasswordMatch(true)
    :
    setPasswordMatch(false);
    setPassword2(e.target.value)
  }

  const checkEmail = (e) => {
    let incomingUser;
    e.preventDefault()
    if(isNew){
       incomingUser = {
        name: name,
        email: email,
        password: password,
        password2: password2
      }
      sendUser(incomingUser, "register")
    } else {
      incomingUser = {
        email: email,
        password: password
      }
      sendUser(incomingUser, "login")
    }
  }

  function sendUser(incomingUser, type){
    fetch(`https://activity-tracker-hearthstone.herokuapp.com/users/${type}`, {
      method: 'POST',
      body: JSON.stringify(incomingUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res)
      return res.json()
    }).then(data => {
      console.log(data)
      props.setUser(data.user);
      type==="login"?
      props.setLocation('profile')
      :
      props.setLocation('NewUserQuestions');
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="formDiv">

    <span>
      <span style={{marginRight: "12px"}}>New User?</span>
      <label className="switch">
        <input
          onChange={toggleIsNew}
          value={isNew}
          type="checkbox"
          name="newUser"/>
        <span className="slider"></span>
      </label>
    </span>
      <form onSubmit={checkEmail}>
      {isNew &&
        <>
        <label>
          Name:<br/>
          <input
          className="formInput"
          onChange={e=>setName(e.target.value)}
          value={name}
          name="name"
          type="text" />
        </label>
        <br/>
        </>
      }
        <label>
          Email:<br/>
          <input
          className="formInput"
          onChange={e=>setEmail(e.target.value)}
          value={email}
          name="email"
          type="email" />
        </label>
        <br/>
        <label>
          Password:<br/>
          <input
          className="formInput"
          onChange={e=>setPassword(e.target.value)}
          value={password}
          name="password"
          type="password" />
        </label>
        <br/>
        {isNew &&
          <label>
            Match Password:<br/>
            {passwordMatch===false &&
              <span className="errorMessage">Passwords Must Match</span>
            }
            <input
            className="formInput"
            onChange={e=> checkPassword2(e)}
            value={password2}
            name="password2"
            type="password" />
          </label>
        }
        <br/>
        <button type="submit">OK</button>
      </form>

    </div>
  );
}
