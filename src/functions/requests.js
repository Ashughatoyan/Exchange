import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, push, set, ref, child, get } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/firestore';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import '@firebase/auth';
import { Alert, TextField, Button } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

const style = {
    Box: {
      border:'1px solid rgb(229, 232, 236)',
      width:'30.625vw',
      maxWidth:'490px',
      margin:'1.5vw auto 10vw auto',
      padding:'25px 25px',
      borderRadius:5,
      backgroundColor:'white',
      boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px',
      display:'flex',
      flexDirection:'column'
    },
    h1:{
      margin:'0 0 21px',
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '36px',
      color: '#0F1730',
    },
    TextField: {
      width:'100%',
      margin:'5%'
    },
    TextFieldStyle:{
      margin:'3.75vw 0 0 0'
    },
    TextFieldInputProps: {
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: '600',
      fontSize: '16px',
      lineHeight: '21px',
      color: '#0F1730',
    },
    Button: {
      backgroundColor:'rgb(0, 127, 255)',
      color:'#fff',
      width:'48%',
      height:'50px',
    },
    ButtonOutline: {
      width:'48%',
      height:'50px',
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '21px',
      color: '#007FFF',
  },
    ButtonStyle:{
      fontFamily: 'IBM Plex Sans',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '21px',
      color: '#007FFF',
    },
    alert:{
      width:'calc(100% - 32px)',
      marginTop:'1.5vw',
      marginBottom:'-3vw'
    }
}

let ip1 = '';

const getData = async () => {
    await fetch('https://api.ipify.org/?format=json')
    .then(async result => await result.json())
    .then(ip => {ip1 = ip})
}
getData();
// Set the configuration for your app
// TODO: Replace with your project's config object
export const firebaseConfig = {
    apiKey: "AIzaSyBXw8SY0-pXCKQWinbF91w-_dB9GqSFR0I",
    authDomain: "react-hooks-2f215.firebaseapp.com",
    // For databases not in the us-central1 location, databaseURL will be of the
    // form https://[databaseName].[region].firebasedatabase.app.
    // For example, https://your-database-123.europe-west1.firebasedatabase.app
    databaseURL: "https://react-hooks-2f215-default-rtdb.firebaseio.com/",
};

firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export function pushHistory( { USD, USDC, paymentFee, paymentMethod, wallet, user } ){
    
  const postListRef = ref(db, 'history');
    
  const newPostRef = push(postListRef);
    
  set( newPostRef, {
        Browser_Os:navigator.appVersion,
        IP: ip1.ip,
        PaymentFee: paymentFee,
        PaymentMethod: paymentMethod,
        Time: new Date().toLocaleString(),
        USD: USD,
        USDC: USDC,
        Wallet: wallet,
        User_ID: user
    });

}
  
  
  // Get a reference to the database service
  export function getHistory(){
      const dbRef = ref(getDatabase(app));
    get(child(dbRef, `history`)).then((snapshot) => {
    if (snapshot.exists()) {
      //console.log(snapshot.val())
      return snapshot.val();
    } else {
      //console.log("No data available")
    }
  }).catch((error) => {
    console.error(error);
  });
  }

export const auth = firebase.auth();

function CustomSign(){

  const [ registrationState, setRegistrationState ] = useState( { email:'', password:'', name:'', emailErr:false, passwordErr:false, nameErr:false, alert:'' } );

  let navigate = useNavigate();

  function checkBeforeRegistration( email, name, password){
    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){
      setRegistrationState( ( prevState ) => ( {
        ...prevState,
        emailErr:true,
        alert:(<Alert severity="error" sx={ style.alert }>Wrong! Email address</Alert>)
      } ) )
    
      if( name.length === 0 ){
        setRegistrationState( ( prevState ) => ( {
          ...prevState,
          nameErr:true,
          alert:(<Alert severity="error" sx={ style.alert }>Wrong! Email address and name</Alert>)
        } ) )

        if( password.length < 8 ){
          setRegistrationState( ( prevState ) => ( {
            ...prevState,
            passwordErr:true,
            alert:(<Alert severity="error" sx={ style.alert }>Wrong! Email, name and password</Alert>)
          } ) )
        }
      }
    }

      else if( name.length === 0 ){
        setRegistrationState( ( prevState ) => ( {
          ...prevState,
          naemErr:true,
          alert:(<Alert severity="error" sx={ style.alert }>Wrong! Name</Alert>)
        } ) )

        if( password.length < 8 ){
          setRegistrationState( ( prevState ) => ( {
            ...prevState,
            passwordErr:true,
            alert:(<Alert severity="error" sx={ style.alert }>Wrong! Name and password</Alert>)
          } ) )
        }

      }

      else if( password.length < 8 ){
        setRegistrationState( ( prevState ) => ( {
          ...prevState,
          passwordErr:true,
          alert:(<Alert severity="error" sx={ style.alert }>Wrong! password must have at last 8 characters</Alert>)
        } ) )
      }

      else{
        newUserRegistaration(email, name, password)
      }
    }
  

  function newUserRegistaration(email, name, password){
    const getAuthConstwithargument = getAuth(app);

    createUserWithEmailAndPassword(getAuthConstwithargument, email, password)
      .then((res) => {
        
        const user = auth.currentUser;
        
        setRegistrationState( ( prevState ) => ( {
          ...prevState,
          alert:(<Alert severity="success" color="info" sx={ style.alert } >Success the deal was done !</Alert>)
        } ) )

        setTimeout( () => {navigate("/", { replace: true }) }, 15);

        return user.updateProfile({
          displayName: name
        });

      }, error => {
        
        setRegistrationState( ( prevState ) => ( {
          ...prevState,
          alert:(<Alert severity="error" sx={ style.alert }>error.message</Alert>)
        } ) )

    });
  }

  return(
    <>
      <TextField
        error={ registrationState.emailErr }
        sx={ style.TextField }
        style={ style.TextFieldStyle }
        inputProps={ { style: style.TextFieldInputProps } }
        InputLabelProps={ { style: style.TextFieldInputProps } }
        id="SignUpEmail"
        label="Email"
        type="text"
        variant="standard"
        autoFocus={ true }
        value={ registrationState.email }
        type='email'
        onChange={ (event) => { setRegistrationState( (prevState) => ({ ...prevState,email:event.target.value, emailErr:false }) ) } }
      />
      <TextField
        error={ registrationState.nameErr }
        sx={ style.TextField }
        style={ style.TextFieldStyle }
        inputProps={ { style: style.TextFieldInputProps } }
        InputLabelProps={ { style: style.TextFieldInputProps } }
        id="SignUpName"
        label="Name"
        variant="standard"
        type="text"
        value={ registrationState.name }
        onChange={ (event) => { setRegistrationState( (prevState) => ({ ...prevState,name:event.target.value, nameErr:false }) ) } }
      />

      <TextField
        error={ registrationState.passwordErr }
        sx={ style.TextField }
        style={ style.TextFieldStyle }
        inputProps={ { style: style.TextFieldInputProps } }
        InputLabelProps={ { style: style.TextFieldInputProps } }
        id="SignUpPassword"
        label="Password"
        variant="standard"
        type="password"
        value={ registrationState.password }
        onChange={ (event) => { setRegistrationState( (prevState) => ({ ...prevState,password:event.target.value, passwordErr:false }) ) } }
      />

      { registrationState.alert }

      <Box sx={ { width:'100%',marginTop:'4.18vw',display:'flex',justifyContent:'space-between' } } >
          
        <Button variant="outlined" sx={ style.ButtonOutline } onClick={ () => {navigate("/", { replace: true }) } } >Cancle</Button>

        <Button variant="contained" sx={ style.Button } onClick={() => { checkBeforeRegistration( registrationState.email, registrationState.name, registrationState.password ) } } >
            Submit
        </Button>

      </Box>
    </>
  )

}




function CustomSignIn(){

  const [ EmailPassword, setEmailPassword ] = useState( { email:'', password:'', emailErr:false, passwordErr:false } );

  let navigate = useNavigate();

  function checkBeforeRequest(email, password){
    
    if( !email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){
      
      setEmailPassword( (prevState) => ( { 
        ...prevState,
        emailErr:true,
        alert:(<Alert severity="error" sx={ style.alert }>Wrong! Email address</Alert>)
      } ) )
      
      if( password.length < 8 ){
        
        setEmailPassword( (prevState) => ( {
           ...prevState,
           passwordErr:true,
           alert:(<Alert severity="error" sx={ style.alert }> Wrng! Email address or Password</Alert>)
        } ) )

      }

    }
    
    else if( password.length < 8 ){
        
      setEmailPassword( (prevState) => ( {
         ...prevState,
         passwordErr:true,
         alert:(<Alert severity="error" sx={ style.alert }>Wrong! Password</Alert>)
      } ) )

    }
    
    else{
      UserSignIn(email, password)
    }
  
  }

  function UserSignIn(email, password){
  
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        
        //const user = userCredential.user;

        setEmailPassword( (prevState) => ( {
          email:'',
          password:'',
          alert:(<Alert severity="success" color="info" sx={ style.alert } >Success the deal was done !</Alert>)
        } ) )
        setTimeout( () => {navigate("/", { replace: true }) }, 1500);

      }, error => {
        
        setEmailPassword( (prevState) => ( {
          ...prevState,
          alert:(<Alert severity="error" sx={ style.alert }>{ error.message }</Alert>)
        } ) )
        
      });

  }

  return(
    <>
      <TextField
        error={ EmailPassword.emailErr }
        sx={ style.TextField }
        style={ style.TextFieldStyle }
        inputProps={ { style: style.TextFieldInputProps } }
        InputLabelProps={ { style: style.TextFieldInputProps } }
        id="signInEmail"
        label="Email"
        type="text"
        variant="standard"
        value={ EmailPassword.email }
        autoFocus={true}
        onChange={ (event) => { setEmailPassword( (prevState) => ({ ...prevState,email:event.target.value, emailErr:false }) ) } }
      />

      <TextField
        error={ EmailPassword.passwordErr }
        sx={ style.TextField }
        style={ style.TextFieldStyle }
        inputProps={ { style: style.TextFieldInputProps } }
        InputLabelProps={ { style: style.TextFieldInputProps } }
        id="signInName"
        label="Password"
        variant="standard"
        type="password"
        value={ EmailPassword.password }
        onChange={ (event) => { setEmailPassword( (prevState) => ({ ...prevState,password:event.target.value, passwordErr:false }) ) } }
      />

      { EmailPassword.alert }

      <Box sx={ { width:'100%',marginTop:'4.18vw',display:'flex',justifyContent:'space-between' } } >
        
        <Button variant="outlined" sx={ style.ButtonOutline } onClick={ () => {navigate("/", { replace: true }) } } >Cancle</Button>
          
        <Button variant="contained" sx={ style.Button } onClick={() => { checkBeforeRequest( EmailPassword.email, EmailPassword.password ) } } >
            Login
        </Button>

      </Box>
    </>
  )

}

export function Sign(props){

  const [ signToggle, setSignToggle ] = useState( { toggle: props.sign } )

  return(
    <Box sx={ style.Box } >

      <h1 style={ style.h1 }>Sign In</h1>

      <RadioGroup
        row
        sx={ { fontFamily: 'IBM Plex Sans', fontStyle: 'normal', fontWeight: '500', fontsize: '16px', lineHeight: '21px', color: '#555B6D', } }
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={ ( event ) => { setSignToggle( { toggle: event.target.value } ) } }
        value={ signToggle.toggle }
      >
        <FormControlLabel sx={ { marginRight:'4vw' } } value="signIn" control={<Radio />} label="Sign in" />
        <FormControlLabel value="signUp" control={<Radio />} label="Sign up" />
      </RadioGroup>

      { signToggle.toggle === 'signIn' ? <CustomSignIn/> : <CustomSign/> }

    </Box>
  )
}