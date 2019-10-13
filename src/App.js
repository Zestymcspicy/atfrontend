import React, {useState} from 'react';
import Header from './Header.js';
import EmailForm from './EmailForm.js';
import Profile from './Profile.js';
// import UserProvider from './UserContext.js';
import './App.css';

function App() {

  const [user, setUser] = useState({})
  const [location, setLocation] = useState('start');

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
