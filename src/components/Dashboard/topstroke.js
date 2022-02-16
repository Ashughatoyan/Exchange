import React,{ useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../functions/requests.js"
import { useNavigate } from "react-router-dom";

function signOutWrapper(){
  signOut(auth).then(() => {
  }).catch((error) => {
      console.log('during log aut accure an error')
  });
}

export default function Topstroke( props ) {

  const [ topstrokeState, setTopstrokeState ] = useState({ signOutForm:'none', user: props.userInfo ? props.userInfo : { displayName : 'Loading...'} })

  let navigate = useNavigate();

  useEffect( () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setTopstrokeState((prevState) =>  ({ ...prevState, user: user }) )
      } else {
        // User is signed out
        // ...
      }
    });
  },[])

  return (
    <>
      <Box style={ { display: 'flex', justifyContent: 'space-between',backgroundColor: 'rgb(255, 255, 255)',height: '48px',boxShadow: '0px 6px 15px rgb(47 128 237 / 10%)'} }>
        
        <div style={ { margin: 'auto 20px',textAlign: 'center' } } >
            <Link to="/" style={ { textDecoration: 'none' } } >
                <p style={ {
                    margin: 0,
                    fontFamily: 'Lato',
                    fontStyle: 'normal',
                    fontWeight: '700',
                    fontSize: '24px ',
                    color: '#2F80ED'
                    } }>
                    Convex
                </p>
            </Link>
        </div>

        <p 
          style={ { cursor:'pointer' } }
          onClick={ () => { setTopstrokeState((prevState) =>  ({ ...prevState, signOutForm: 'block' }) ) } } 
        >
          {topstrokeState.user.displayName + '/' + topstrokeState.user.email + ' ' }
          <svg class="svg" width="8" height="7" viewBox="0 0 8 7" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M3.646 5.354l-3-3 .708-.708L4 4.293l2.646-2.647.708.708-3 3L4 5.707l-.354-.353z"
              fill-rule="evenodd"
              fill-opacity="1"
              fill="#000"
              stroke="none">
            </path>
          </svg>
        </p>

        <Link to="../buysection"  style={ { margin: 'auto 20px auto 30px' } } >
          <Button
            variant="contained"
            color="primary"
            style={ { textTransform: 'none',height: '25px',width: '66px',backgroundColor: '#007fff' } }
          >
          Buy
          </Button>
        </Link>
      </Box>

      <div style={ { display:topstrokeState.signOutForm,width:'100%',height:'100%',position:'absolute',backgroundColor:'rgba(0,0,0, 25%)',zIndex:2, } } >
        <div style={ { position:'absolute',top:'35%',left:'38%',height:'100px',width:'300px',borderRadius:'5px',backgroundColor:'#fff' } }>
          <Typography sx={ { fontFamily: 'Lato',fontStyle: 'normal',fontWeight: 'bold',fontSize: '18px',lineheight:'14px',color: '#152766',marginTop:'10px',marginLeft:'10px' } }>
              Do you want to log out ?
          </Typography>
          <div style={ { marginTop:'10px',display:'flex',justifyContent:'center' } }>
            <Button 
              sx={ { background: '#007fff;',borderRadius: '5px',color:'#fff','&:hover':{ backgroundColor: '#1f56a1' } } }
              onClick={() => { setTopstrokeState((prevState) =>  ({ ...prevState, signOutForm: 'none' }) ) }}
            >
              Cancel
            </Button>
            <Button 
              sx={ { background: '#152766',borderRadius: '5px',color:'#fff',marginLeft:'15px','&:hover':{ backgroundColor: '#1f56a1' } } }
              onClick={ () => { signOutWrapper(); navigate("/", { replace: true }) } }
            >
              Yes
            </Button>
          </div>
        </div>
      </div>

    </>
  );
}