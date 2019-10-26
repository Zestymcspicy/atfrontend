import React from 'react';

export default function Dropdown(props) {

  function signOut(e) {
    props.toggleDropDown(e);
    props.setUser();
    props.setData([]);
    props.setLocation('start')
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
      <button style={styles.dropdownTab} onClick={signOut}>Sign Out</button>
      <button style={styles.dropdownTab} onClick={props.setLocation('archive')}>Archive</button>
    </div>
  )
}
