import React, {useState} from 'react';
import Header from './Header.js';
import EmailForm from './EmailForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
import AdminDash from './AdminDash.js'
import Archive from './Archive.js';
import './App.css';

function App() {

  const [user, setUser] = useState();
  const [location, setLocation] = useState('start');
  const [data, setData] = useState([]);
  const [adminArchive, setAdminArchive] = useState(false);
  const [adminLocation, setAdminLocation] = useState('AdminHome');

  const updateTaskAndUser = task => {

    let newTaskList = user.tasks.filter(x => x._id !== task._id);
    newTaskList.push(task)
    let updatedUser = user;
    updatedUser.tasks = newTaskList;
    // return fetch('https://activity-tracker-hearthstone.herokuapp.com/users/update', {
    return fetch('http://localhost:5000/users/update', {
      method: 'PUT',
      body: JSON.stringify({task, updatedUser}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    // props.setUser(repUser)
    .then(res => {
      console.log(res);
      return res.json();
    }).then(data => setUser(data))
  }
  // const [user, setUser] = useState({
  //   date: "2019-10-13T04:02:09.438Z",
  //   email: "HopsTheDog@dogmail.com",
  //   isAdmin: false,
  //   name: "hop",
  //   // tasks: {},
  //   tasks: [{_id: "idThe1st",name: "cat", longTermGoal:false},
  //       {_id: "idThe2nd", name: "face", longTermGoal:true}],
  //   __v: 0,
  //   _id: "5da2a1c12b83b52660df59c5"})

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
            return <EmailForm
              setData={setData}
              setUser={setUser}
              setLocation={setLocation}/>;
            case 'profile':
              return <Profile
                user={user}
                setUser={setUser}
                setLocation={setLocation}
                updateTaskAndUser={updateTaskAndUser}/>;
            case 'NewUserQuestions':
              return<NewUserQuestions
                user={user}
                setUser={setUser}
                setLocation={setLocation}/>
            case 'adminDash':
              return<AdminDash
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
