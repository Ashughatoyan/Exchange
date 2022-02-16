import React, { useState, useEffect } from 'react';
import BasicTable from '../Dashboard/table';
import Topstroke from '../Dashboard/topstroke';
import Sidebar from '../Dashboard/sidebar';
import History from '../Dashboard/history';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../functions/requests.js"

export default function Dashboard() {

  const [ dashboardState, setDashboardState ] = useState( {
    sidebar:0,
    startTime:'2022-02-22',
    statusSwitch:[ 'All', 'succeed', 'rejected' ],
    endTime: new Date().toLocaleDateString('en-GB').split('/').reverse().join('-')
  } );

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDashboardState((prevState) => ({ ...prevState, user: user, startTime: new Date(Number(user.metadata.createdAt) )
          .toLocaleDateString('en-GB')
          .split('/')
          .reverse()
          .join('-')  }) )
      } else {
        // User is signed out
        // ...
      }
    });
  },[])

  return(
    <>
      
      <Topstroke userInof={ dashboardState.user } />

      <div style={ { width: '16vw',backgroundColor: 'rgb(255, 255, 255)',position: 'absolute',height: '100%', } } >
        <Sidebar state={ dashboardState.sidebar } setState={ setDashboardState } />
      </div>

      <div style={ { display:'flex' } }>
        { dashboardState.sidebar===0?
          <History state={ dashboardState } setState={ setDashboardState }/>:
          <p style={ { marginLeft:'19vw' } }> այստեղ կլինի կարգավորումների բաժինը </p>
        }
      </div>

    </>
  )  
}