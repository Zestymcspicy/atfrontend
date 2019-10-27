import React from 'react';

export default function Dropdown(props) {

  const signOut = e => {
    props.toggleDropDown(e);
    props.setUser();
    props.setData([]);
    props.setLocation('start')
  }

  const goToArchive = e => {
    console.log("archive")
    if(props.user.isAdmin!==true){
      props.setLocation('archive')
    } else if (props.user.isAdmin) {
      console.log("workingonit")
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
      <button style={styles.dropdownTab} onClick={()=>signOut}>Sign Out</button>
      {props.location!=="archive"?
      <button style={styles.dropdownTab} onClick={goToArchive}>Archive</button>
      :
      <button style={styles.dropdownTab}
        onClick={()=>props.setLocation('profile')}>
        Profile
      </button>
      }
    </div>
  )
}
