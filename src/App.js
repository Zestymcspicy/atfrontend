import React, {useState} from 'react';
import Header from './Header.js';
import NameForm from './NameForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
import AdminDash from './AdminDash.js'
import Archive from './Archive.js';
import './App.css';

function App() {

  const [url, setUrl] = useState('http://localhost:5000/')
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
    // return fetch('http://localhost:5000/users/update', {
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
        setAdminLocation={setAdminLocation}
        setLocation={setLocation}/>
      {(function(){
        switch(location){
          case 'start':
            return <NameForm
              url={url}
              setData={setData}
              setUser={setUser}
              setLocation={setLocation}/>;
            case 'profile':
              return <Profile
                url={url}
                user={user}
                setUser={setUser}
                setLocation={setLocation}
                updateTaskAndUser={updateTaskAndUser}/>;
            case 'NewUserQuestions':
              return<NewUserQuestions
                url={url}
                user={user}
                setUser={setUser}
                setLocation={setLocation}/>
            case 'adminDash':
              return<AdminDash
                url={url}
                setData={setData}
                data={data}
                user={user}
                adminLocation={adminLocation}
                setAdminLocation={setAdminLocation}
                updateTaskAndUser={updateTaskAndUser}
                />
            case 'archive':
              return <Archive
                user={user}
                updateTaskAndUser={updateTaskAndUser}
                />
          default:
            return <p>whoops</p>;
        }
      })()}
    </div>
  );
}

export default App;
