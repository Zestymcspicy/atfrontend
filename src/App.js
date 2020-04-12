import React, {useState} from 'react';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Header.js';
import NameForm from './NameForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
import AdminDash from './AdminDash.js'
import Archive from './Archive.js';
import './App.css';

function App() {

  const url  = 'http://localhost:5000/'
  // const [url, setUrl] = useState('https://activity-tracker-hearthstone.herokuapp.com/')
  const [user, setUser] = useState();
  const [location, setLocation] = useState('start');
  const [data, setData] = useState([]);
  // const [adminArchive, setAdminArchive] = useState(false);
  const [adminLocation, setAdminLocation] = useState('AdminHome');

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
      setUser(resData.body)

    })
  }


  return (
    <div className="App">
      <Header
        user={user}
        setUser={setUser}
        setData={setData}
        location={location}
        adminLocation={adminLocation}
        setAdminLocation={setAdminLocation} />
      <Switch>
              <Route path='/NewUserQuestions'>
              <NewUserQuestions
                url={url}
                user={user}
                setUser={setUser}
                />
              </Route>
              <Route path='/'>
              <NameForm
                url={url}
                setData={setData}
                setUser={setUser}
                />
              </Route>
              <PrivateRoute>
              <Route path='/profile'>
                <Profile
                  url={url}
                  user={user}
                  setUser={setUser}
                  updateTaskAndUser={updateTaskAndUser} />
                </Route>
                <Route path='/adminDash'>
                <AdminDash
                  url={url}
                  setData={setData}
                  data={data}
                  user={user}
                  adminLocation={adminLocation}
                  setAdminLocation={setAdminLocation}
                  updateTaskAndUser={updateTaskAndUser} />
                </Route>
                <Route path='/archive'>
                <Archive
                  user={user}
                  updateTaskAndUser={updateTaskAndUser} />
                </Route>
                </PrivateRoute>
            </Switch>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        App.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export default App;
