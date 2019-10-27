import React, { useState, useEffect } from 'react';
import Profile from './Profile.js';
import Archive from './Archive.js';

export default function AdminDash(props) {
  const [focusedUser, setFocusedUser] = useState();
  const [adminLocation, setAdminLocation] = useState('AdminHome');
  const OpenDetailScreen = user  => {
    setFocusedUser(user);
    setAdminLocation('profile')
  }
  useEffect(() => {
    if(props.adminArchive===true){
      setAdminLocation('archive')
    } else if(props.adminArchive===false){
      focusedUser?
      setAdminLocation('profile')
      :
      setAdminLocation('AdminHome')
    }
  }, [setAdminLocation, focusedUser, props.adminArchive]);

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
        updateTaskAndUser={props.updateTaskAndUser}
        user={focusedUser}
        />
    )
    case 'archive':
    return(
      <Archive
        updateTaskAndUser={props.updateTaskAndUser}
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
