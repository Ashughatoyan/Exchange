import React, { useState, useEffect, useRef } from "react";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { Button } from '@mui/material';
import { withStyles } from '@mui/styles';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../functions/requests.js"

const styles = {
    boxc:{
        display:'flex',
        alignItems:'center',
        flexDirection:'column',
        marginTop:'14px'
    },
    Button:{
        width: '95%',
        borderRadius:'5px',
        height: '40px',
        justifyContent:'flex-start',
        marginTop:'10px',
        '&:hover':{
            backgroundColor:'#0D1E5C',
            color:'#fff'
        }
    }
}

const SidebarData = [
    {
        title:"History",
        icon:<TimerRoundedIcon color="inherit" />,
        link:"/History",
    },
    {
        title:"Settings",
        icon:<SettingsOutlinedIcon color="inherit" />,
        link:"/Settings",
    },
];

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

const StyledButton = withStyles({
    root: {
        ...styles.Button
    },
})(Button);

export default function Sidebar( props ) {
  
    const [ sidebarState, setSidebarState ] = useState( { user:{ displayName:'Loading' }, buttonChoose: props.state } );

    const prevAmount = usePrevious( props.state );

    useEffect(() => {
        if(prevAmount !== props.state ) {
            setSidebarState((prevState) => ({ ...prevState, buttonChoose: props.state }) )
        }
    }, [ props.state ])

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setSidebarState((prevState) => ({ ...prevState, user: user }) )
        } else {
            // User is signed out
            // ...
        }
        });
    },[])

    return (
    <div style={ styles.boxc }>
        { SidebarData.map((item, index) => 
            <StyledButton 
                key={ item.title?item.title:index+'key' }
                variant="text"
                color="primary"
                sx={ { 
                    ...styles.Button, 
                    backgroundColor: sidebarState.buttonChoose===index? '#0D1E5C' : '#fff',
                    color: sidebarState.buttonChoose===index? '#fff' : '#0D1E5C',
                } }
                onClick={ () => { props.setState((prevState) => ({ ...prevState, sidebar:index }) ) } }
                >
                <i style={ { marginRight: '10px', height:'24px' } } >{item.icon}</i>
                {item.title}
            </StyledButton>
        )
    } 
    </div>
  );
}