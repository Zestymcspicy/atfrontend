import React from 'react';

const Header = () => {



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
    }
  }

  return(
    <div style={styles.header}>
      <h1 style={styles.title}>Activity Tracker</h1>
    </div>
  )
}

export default Header;
