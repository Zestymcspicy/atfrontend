import React, {useState} from 'react';
import Header from './Header.js';
import EmailForm from './EmailForm.js';
import Profile from './Profile.js';
// import UserProvider from './UserContext.js';
import './App.css';

function App() {

  const [user, setUser] = useState({
date: "2019-10-13T04:02:09.438Z",
email: "HopsTheDog@dogmail.com",
isAdmin: false,
name: "hop",
password: "$2a$10$MODB9gRxtDtbScAefUyHpujcGZ9LDCNBXuR2cwcwCpUAy.cfOtxSC",
tasks: [{name: "cat"}, {name: "face"}],
__v: 0,
_id: "5da2a1c12b83b52660df59c5"})
  const [location, setLocation] = useState('profile');

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
                setLocation={setLocation}/>
          default:
            return <p>whoops</p>;
        }
      })()}
    </div>
  );
}

export default App;
