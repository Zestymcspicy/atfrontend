import React, {useState} from 'react';
import Header from './Header.js';
import EmailForm from './EmailForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
import AdminDash from './AdminDash.js'
// import UserProvider from './UserContext.js';
import './App.css';

function App() {

  const [user, setUser] = useState();
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
  const [location, setLocation] = useState('start');
  // const [location, setLocation] = useState('NewUserQuestions');
  const [data, setData] = useState([]);

  return (
    <div className="App">
      <Header
        user={user}
        setUser={setUser}
        setData={setData}
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
                setLocation={setLocation}/>;
            case 'NewUserQuestions':
              return<NewUserQuestions
                user={user}
                setUser={setUser}
                setLocation={setLocation}/>
            case 'adminDash':
              return<AdminDash
                data={data}
                user={user}
                />
            case 'archive':
              return <h2>ARCHIVE</h2>
          default:
            return <p>whoops</p>;
        }
      })()}
    </div>
  );
}

export default App;
