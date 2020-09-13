import React, {useState} from 'react';
import {
  Redirect,
  Router,
  Switch,
  Route,
  Link,
  useHistory,
  useLocation
} from "react-router-dom";
import Header from './Header.js';
import NameForm from './NameForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
import AdminDash from './AdminDash.js'
import Archive from './Archive.js';
import PrivateRoute from './PrivateRoute.js'
import { AuthContext } from './context/auth.js'
import { UserProvider } from './context/UserContext.js'
import './App.css';


function App() {

  // const url  = 'http://localhost:5000/'
  const [url, setUrl] = useState('https://activity-tracker-hearthstone.herokuapp.com/')
  const [user, setUser] = useState(undefined);
  const [focusedUser, setFocusedUser] = useState();
  // const [location, setLocation] = useState('start');
  const [data, setData] = useState([]);
  // const [adminArchive, setAdminArchive] = useState(false);
  // const [adminLocation, setAdminLocation] = useState('AdminHome');
  // const history = useHistory();
  // if (user == undefined){
  //   history.push('/')
  // }

  let existingTokens;
  localStorage.getItem("tokens")==="undefined"?
    existingTokens=undefined:
    JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  const updateTaskAndUser = task => {
    let newTaskList = user.tasks.filter(x => x._id !== task._id);
    newTaskList.push(task)
    let updatedUser = user;
    updatedUser.tasks = newTaskList;
    return fetch(`${url}users/update`, {

      method: 'PUT',
      body: JSON.stringify({task, updatedUser}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(resData => {
      setFocusedUser(resData.body)
      setUser(resData.body)
    })
  }



  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <UserProvider value={{setUser, user, setFocusedUser, focusedUser}}>
    <div className="App">
      <Header
        user={user}
        setUser={setUser}
        setData={setData}
         />

              <Route path='/NewUserQuestions'>
              <NewUserQuestions
                url={url}
                user={user}
                setFocusedUser={setFocusedUser}
                setUser={setUser}
                />
              </Route>
              <Route exact path='/'>
              <NameForm
                url={url}
                setData={setData}
                setUser={setUser}
                setFocusedUser={setFocusedUser}
                />
              </Route>

              <PrivateRoute user={user} path='/profile'>
                <Profile
                  url={url}
                  user={user}
                  setUser={setUser}
                  setFocusedUser={setFocusedUser}
                  focusedUser={focusedUser}
                  updateTaskAndUser={updateTaskAndUser} />
              </PrivateRoute>
              <PrivateRoute user={user} path='/adminDash'>
                <AdminDash
                  url={url}
                  setData={setData}
                  data={data}/>
              </PrivateRoute>
              <PrivateRoute user={user} path='/archive'>
                <Archive
                  user={user}
                  focusedUser={focusedUser}
                  updateTaskAndUser={updateTaskAndUser} />
              </PrivateRoute>


    </div>
    </UserProvider>
  </AuthContext.Provider>
  );
}


export default App;
