import React, { useState } from "react";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from './context/auth'


export default function NameForm(props) {



  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [isNew, setIsNew] = useState(false);
  // const { setAuthTokens } = useAuth();

  const toggleIsNew = () => {
    setIsNew(!isNew);
  }

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const checkPassword2 = e => {
    password===e.target.value?
    setPasswordMatch(true)
    :
    setPasswordMatch(false);
    setPassword2(e.target.value)
  }

  const checkName = (e) => {
    e.preventDefault();
    let incomingUser;
    if(isNew){
       incomingUser = {
        name: name,
        password: password,
        password2: password2
      }
      sendUser(incomingUser, "register")
    } else {
      incomingUser = {
        name: name,
        password: password
      }
      sendUser(incomingUser, "login")
    }
  }

  function sendUser(incomingUser, type){
    fetch(`${props.url}users/${type}`, {
      method: 'POST',
      body: JSON.stringify(incomingUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res)
      if(res.status>=400){
        console.log(res)
        return res.json()
        .then(errors => {
          // console.log(errors);
          let errString = ""
          for(const err in errors){
            errString+=errors[err]
          }

          return setError(errString);
        })
      }
      return res.json()
    }).then(data => {
      console.log(data)
      // setAuthTokens(data )
      props.setUser(data.user);
      if(data.user.isAdmin){
        props.setData(data.allUsers);
        // history.replace(from);
        return history.push('/adminDash');
      }else{
        props.setFocusedUser(data.user);
      }
      type==="login"?
      history.push('/profile')
      :
      history.push('/NewUserQuestions');
    })
    .catch(errs => {
      for(const err in errs){
        setError(errs[err])
      }
    })
  }

  return (
    <div className="formDiv">
    <span>
      <span>New User?</span>
      <br/>
      <span style={{marginRight: "12px"}}>No</span>
      <label className="switch">
        <input
          onChange={toggleIsNew}
          value={isNew}
          type="checkbox"
          name="newUser"/>
        <span className="slider"></span>
      </label>
      <span style={{marginLeft: "12px"}}>Yes</span>
    </span>
      <form onSubmit={checkName}>
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
        {error!=="" &&
          <div>
          <span className="errorMessage">{error}</span>
          <br/>
          </div>
        }
        <label>
          Password:<br/>
        {isNew &&
          password.length<8 &&
              <div>
                <span className="errorMessage">Password Must Be At Least 8 Characters</span>
              </div>
            }
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
        <button
          className="StandardButton"
          type="submit">OK</button>
      </form>

    </div>
  );
}
