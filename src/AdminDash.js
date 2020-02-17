import React, { useState, useEffect } from 'react';
import Profile from './Profile.js';
import Archive from './Archive.js';

export default function AdminDash(props) {

  const [verify, setVerify] = useState(false);
  const [focusedUser, setFocusedUser] = useState();
  const [editModalOpen, setEditModalOpen] = useState(false);

  const OpenDetailScreen = user  => {
    setFocusedUser(user);
    props.setAdminLocation('profile')
  }

  const ToggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const OpenEditModal = user => {
    ToggleEditModal();
    setFocusedUser(user);
  }

  const adminUpdateTaskAndUser = task => {
    console.log(focusedUser)
    let updatedUser = focusedUser
    return fetch(`${props.url}users/update`, {
      method: 'PUT',
      body: JSON.stringify({task, updatedUser}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(returnedUser=>{
      returnedUser = returnedUser.body
      let newData= props.data.filter(x=> x._id!==returnedUser._id)
      props.setData([...newData, returnedUser])
    })
  }

  const DeleteUser = () => {
    setVerify(false);
    ToggleEditModal();
    fetch(`${props.url}users/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({_id: `${focusedUser._id}`})
    })
    .then(res => res.json())
    .then(res => {
      console.log(res);
      let newData = props.data.filter(x => x._id!==focusedUser._id);
      props.setData(newData);
    })
    .catch(err=> console.log(err))
  }



  const EditModal = user => {
    return(
      <div
        onClick={ToggleEditModal}
        className="ModalOverlay">
      <div
        onClick={e=>e.stopPropagation()}
        className="AdminEditModal">
        <div className="AdminEditModalTop">
        <h3>{focusedUser.name}</h3>
          <span onClick={ToggleEditModal}>&#215;</span>
        </div>
        <div className="AdminButtonDiv">
        {focusedUser.isAdmin?
          <div>
            Administrator
            <button
              className="AdminModalButton"
              onClick={ToggleEditModal}
              style={{backgroundColor:"red"}}>Turn Off Admin</button>
          </div>
          :
          <div>
            Not Administrator
            <button
              className="AdminModalButton"
              onClick={()=>console.log("click")}
              style={{backgroundColor:"green"}}
               >Make Admin</button>
          </div>
        }
        </div>
        {verify && <AreYouSureModal/>}
          <button
            className="AdminModalButton DeleteUserButton"
            onClick={()=>setVerify(true)}>Delete User</button>
      </div>
    </div>
    )
  }

  const AreYouSureModal = () => {
    return(
      <div className="DeleteOverlay"
        onClick={()=>setVerify(false)}>
      <div onClick={e=>e.stopPropagation()}
        className="AreYouSureModal">
        <span>Are you sure you want to delete {focusedUser.name}?</span>
        <button
          onClick={() => DeleteUser()}
          className="AdminModalButton">Yes</button>
        <button
          className="AdminModalButton"
          onClick={()=> setVerify(false)}>No</button>
      </div>
      </div>
    )
  }

  return(
    <div>
    {editModalOpen && <EditModal user={focusedUser}/>}
    <h2>ADMIN!!!!!!</h2>
    {(function(){
      switch(props.adminLocation) {
        case 'AdminHome':
        return(
        <ol>{props.data.filter(user => user.isAdmin===false).map((x,index) => {
        return(<li key={index}>
          <div className="AdminUserListEntry">
            {x.name}
            <div className="adminListButtonBox">
              <button
              onClick={()=>OpenEditModal(x)}
              className="StandardButton"
              >Edit</button>
              <button
              onClick={()=>OpenDetailScreen(x)}
              className="StandardButton"
              >View</button>
            </div>
          </div>
        </li>)
      }
      )}
    </ol>)
    case 'profile':
    return(
      <Profile
        setUser={setFocusedUser}
        updateTaskAndUser={adminUpdateTaskAndUser}
        user={focusedUser}
        url={props.url}
        />
    )
    case 'archive':
    return(
      focusedUser?
      <Archive
        updateTaskAndUser={adminUpdateTaskAndUser}
        user={focusedUser}
        />
      :
      <span>No user selected</span>
    )
    default:
      return <p>whoops</p>;
  }
})()}
    </div>
  )
}
