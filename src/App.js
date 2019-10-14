import React, {useState} from 'react';
import Header from './Header.js';
import EmailForm from './EmailForm.js';
import Profile from './Profile.js';
import NewUserQuestions from './NewUserQuestions.js';
// import UserProvider from './UserContext.js';
import './App.css';

function App() {

  // const [user, setUser] = useState({});
  const [user, setUser] = useState({
    date: "2019-10-13T04:02:09.438Z",
    email: "HopsTheDog@dogmail.com",
    isAdmin: false,
    name: "hop",
    // tasks: {},
    tasks: [{_id: "idThe1st",name: "cat", longTermGoal:false},
        {_id: "idThe2nd", name: "face", longTermGoal:true}],
    __v: 0,
    _id: "5da2a1c12b83b52660df59c5"})
  // const [location, setLocation] = useState('start');
  const [location, setLocation] = useState('NewUserQuestions');

  return (
    <div className="App">
      <Header />
      {(function(){
        switch(location){
          case 'start':
            return <EmailForm
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
                setLoation={setLocation}/>
          default:
            return <p>whoops</p>;
        }
      })()}
    </div>
  );
}

export default App;
