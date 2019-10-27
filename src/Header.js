import React, {useState} from 'react';
import Dropdown from './Dropdown';

const Header = props => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = e => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  }

  const styles = {
    header:{
      backgroundColor: "#113450",
      color: "#FFFFFF",
      textAlign: "center",
      height: "60px",
      zIndex: 5
    },
    title: {
      margin: "0 auto 0 auto",
      padding: "10px 0 20px 0"
    },
    dropdownButton: {
      backgroundColor: "#113450",
      border: "1px solid #113450",
      color: "#FFFFFF",
      position: "absolute",
      left: "10px",
      top: "10px"
    },
    buttonDiv: {
      width: "24px",
      border: "solid 1px white",
      height: "1px",
      backgroundColor: "white",
      margin: "5px 0"
    }
  }

  return(
    <div style={styles.header}>
      {props.user &&
      <button
        style={styles.dropdownButton}
        onClick={toggleDropdown}>
        <div style={styles.buttonDiv}></div>
        <div style={styles.buttonDiv}></div>
        <div style={styles.buttonDiv}></div>
      </button>
      }
        {dropdownOpen && <Dropdown
          user={props.user}
          toggleDropdown={toggleDropdown}
          setUser={props.setUser}
          location={props.location}
          setLocation={props.setLocation}
          adminLocation={props.adminLocation}
          setAdminLocation={props.setAdminLocation}
          setData={props.setData}/>}
      <h1 style={styles.title}>Activity Tracker</h1>
    </div>
  )
}

export default Header;
