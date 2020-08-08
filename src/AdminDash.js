import React, { useState, useEffect, useContext } from 'react';
import Profile from './Profile.js';
import Archive from './Archive.js';
import { useHistory, Route } from 'react-router-dom';
import UserContext from './context/UserContext.js'

export default function AdminDash(props) {

  const [verify, setVerify] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const history = useHistory()
  const {user, focusedUser, setFocusedUser} = useContext(UserContext);
  if(user==undefined){
    history.push('/');
  }
  const OpenDetailScreen = user  => {
    setFocusedUser(user);
    history.push(`/profile/`)
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
    <h2>{user.name}</h2>
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
    </ol>
  </div>
  )
}
// {(function(){
  // switch(props.adminLocation) {
    // case 'AdminHome':
    // return(
// <Profile setUser={props.setFocusedUser}
//   updateTaskAndUser={adminUpdateTaskAndUser}
//   user={props.focusedUser}
//   url={props.url}
//   />
//   props.focusedUser?
//   <Archive
//     updateTaskAndUser={adminUpdateTaskAndUser}
//     user={props.focusedUser}
//     />
//   :
//   <span>No user selected</span>
