import React from 'react';

export default function Dropdown(props) {

  function signOut() {
    props.setUser({});
    props.setData([]);
    props.setLocation('start')
  }

  return(
    <div>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={props.setLocation('archive')}>Archive</button>
    </div>
  )
}
