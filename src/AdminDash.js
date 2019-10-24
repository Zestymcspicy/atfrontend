import React, { useState } from 'react';

export default function AdminDash(props) {
  const [adminLocation, setAdminLocation] = useState('AdminHome');
  const OpenDetailScreen = user  => {
    console.log(user)
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
          onClick={OpenDetailScreen(x)}
          key={index}>
          <div className="AdminUserListEntry">
            {x.name}
          </div>
        </li>)
      }
      )}
    </ol>)
    default:
      return <p>whoops</p>;
  }
})()}
    </div>
  )
}
