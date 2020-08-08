import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { BrowserRouter as Router,  } from 'react-router-dom';

export default function Dropdown(props) {

  const history = useHistory();
  const signOut = e => {
    props.toggleDropdown(e);
    props.setUser();
    props.setData([]);
    history.push('/')
  }

  const goToArchive = e => {
    props.toggleDropdown(e);
    // if(props.user.isAdmin!==true){
    //   history.push('/archive')
    // } else if (props.user.isAdmin) {
    //   history.push('/adminDash/archive');
    // }
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
      <Router>
      {props.user.isAdmin &&
        <button style={styles.dropdownTab} onClick={e=>{
            props.toggleDropdown(e)
          }}><Link to='/adminDash'>Admin Home</Link></button>
      }

      <button
        style={styles.dropdownTab}
        onClick={goToArchive}>
        <Link to="/archive">Archive</Link>
    </button>

      <button style={styles.dropdownTab}
        onClick={e=>returnToProfile(e)}>
        <Link to="/profile">Profile</Link>
      </button>
      
      <button style={styles.dropdownTab} onClick={e=>signOut(e)}>
        <Link to='/'>Sign Out</Link>
      </button>
      </Router>
    </div>
  )
}
