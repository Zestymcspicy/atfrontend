import React, { useState } from 'react';
import Profile from './Profile.js';

export default function AdminDash(props) {
  const [focusedUser, setFocusedUser] = useState();
  const [adminLocation, setAdminLocation] = useState('AdminHome');
  const OpenDetailScreen = user  => {
    setFocusedUser(user);
    setAdminLocation('profile')
  }

  return(
    <div>
    <h2>ADMIN!!!!!!</h2>
    {(function(){
      switch(adminLocation) {
        case 'AdminHome':
        return(
        <ol>{props.data.map((x,index) => {
        return(<li
          onClick={()=>OpenDetailScreen(x)}
          key={index}>
          <div className="AdminUserListEntry">
            {x.name}
          </div>
        </li>)
      }
      )}
    </ol>)
    case 'profile':
    return(
      <Profile
        user={focusedUser}
        />
    )
    default:
      return <p>whoops</p>;
  }
})()}
    </div>
  )
}
