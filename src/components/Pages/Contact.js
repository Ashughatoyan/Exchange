import React, { useState } from 'react';
import { TextField, Button, Alert } from "@mui/material";
import { Box } from "@mui/system";
import { push, set, ref } from "firebase/database";
import { Link } from "react-router-dom";
import { db } from "../../functions/requests";

const style = {
    Box: {
        border:'1px solid rgb(229, 232, 236)',
        width:'450px',margin:'1.5vw auto auto',
        borderRadius:5,
        backgroundColor:'white',
        boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px'
    },
    h1:{
        margin:'5% 0 0 5%',
        fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
        fontWeight:400,
        fontSize:'1.3rem',
        lineeight:'1.5',
        letterSpacing:'0.00938em',
    },
    TextField: {
        width:'90%',
        margin:'5%'
    },
    Button: {
        backgroundColor:'rgb(0, 127, 255)',
        color:'#fff',
        marginLeft:'5%',
        width:'90%',
        margin:'5%'
    }
}

function pushPost( email, message ){
    
    const postListRef = ref(db, 'post');
      
    const newPostRef = push(postListRef);
      
    set( newPostRef, {
          Email: email,
          Mesage: message
      });

  }

export default function Contact() {

    const [ contactState, setContactState ] = useState( { email:'', message:'', alert:'', emailErr:false, messageErr:false } );

    function validateBeforePush(){
      if( !contactState.email.toLowerCase().match(/^\S+@\S+\.\S+$/) ){
        setContactState((prevState) => ({ ...prevState, emailErr:true, alert:(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            Fill an email for responde 
        </Alert>) }));
        if( contactState.message.length < 1 ){
            setContactState((prevState) => ({ ...prevState, messageErr:true, alert:(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
                Fill an email for respond and message
            </Alert>) }))
        }
      }
      else if( contactState.message.length < 1 ){
        setContactState((prevState) => ({ ...prevState, messageErr:true, alert:(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            Write a message
        </Alert>) }))
      }
      else{
        pushPost( contactState.email, contactState.message );
        setContactState((prevState) => ({ ...prevState, alert:(
            <Alert severity="success" color="info" sx={ {margin:"0 5% 0 5%"} } >
                Success the deal was done !
            </Alert>) }))
      }
    }

    return(

        <>

            <div style={ {margin:"5vw auto 2.5vw auto",width:'fit-content'} } >
                <Link to="/" style={ { textDecoration: 'none' } } >
                    <p style={ 
                        {fontSize: 58,
                        fontFamily: 'Aquire',
                        margin: 0,
                        color: 'rgb(0, 127, 255)',
                        textShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 20%) 0px 10px 10px'
                        } }>
                        Convex
                    </p>
                </Link>
            </div>

            <Box sx={ style.Box } >

                <h1 style={ style.h1 }>Contact Us</h1>

                <TextField
                    error={ contactState.emailErr }
                    sx={ style.TextField }
                    id="standard-basic"
                    label="Email"
                    type="text"
                    variant="standard"
                    onChange={ (event) => { setContactState( (prevState) => ({ ...prevState,email:event.target.value, emailErr:false }) ) } }
                />
                <TextField
                    error={ contactState.messageErr }
                    sx={ style.TextField }
                    id="standard-basic"
                    label="Message"
                    variant="standard"
                    multiline={ true }
                    onChange={ (event) => { setContactState( (prevState) => ({ ...prevState,message:event.target.value, messageErr:false }) ) } }
                />

                { contactState.alert }

                <Button 
                    variant="contained"
                    sx={ style.Button }
                    onClick={ () => { validateBeforePush() } }
                >
                    Submit
                </Button>

            </Box>
        </>
    )
}