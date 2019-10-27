import React from 'react';

export default function Dropdown(props) {

  const signOut = e => {
    props.toggleDropdown(e);
    props.setUser();
    props.setData([]);
    props.setLocation('start')
  }

  const goToArchive = e => {
    props.toggleDropdown(e);
    if(props.user.isAdmin!==true){
      props.setLocation('archive')
    } else if (props.user.isAdmin) {
      props.setAdminLocation('archive');
    }
  }

  const returnToProfile = e => {
    props.toggleDropdown(e)
    if(props.user.isAdmin!==true){
      props.setLocation('profile')
    } else if (props.user.isAdmin){
      props.setAdminLocation('profile');
    }
  }

  const styles = {
    dropdownTab: {
      border: "none",
      backgroundColor: "transparent",
      color: "white",
      padding: "5px",
      margin: "10px 0 10px 0"
    }
  }
  return(
    <div className="Dropdown">
      {props.user.isAdmin &&
        <button style={styles.dropdownTab} onClick={e=>{
            props.toggleDropdown(e)
            props.setAdminLocation('AdminHome')}
          }>Admin Home</button>
      }
      {props.location!=="archive"&&props.adminLocation!=="archive"?
      <button style={styles.dropdownTab} onClick={goToArchive}>Archive</button>
      :
      <button style={styles.dropdownTab}
        onClick={e=>returnToProfile(e)}>
        Profile
      </button>
      }
      <button style={styles.dropdownTab} onClick={e=>signOut(e)}>Sign Out</button>
    </div>
  )
}
