import React, { useState, useEffect, useRef } from 'react';
import { Button, Typography, TextField } from '@mui/material';
import BasicTable from './table';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const styles = {
    Button: {
      backgroundColor:'#152766',
      color:'#fff',
      fontSize:'1vw',
      marginRight:'1.527vw',
      "&:hover": {
        backgroundColor: '#1f56a1',
      },
    }
  }

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function History( props ){

    const [ historyState, setHistoryState ] = useState( { ...props.state } );

    const prevAmount = usePrevious( { ...props.state } );

    useEffect(() => {
        if(prevAmount !== { ...props.state } ) {
            setHistoryState((prevState) => ({ ...props.state }) )
        }
    }, [ props.state ])

    return (
        
        <div style={ { margin: '25px 15px 15px 17.5vw',width: 'calc(100% - 18.5vw)' } } >

            <div style={ { fontSize:'18px',marginBottom:'25px' } } >
            <Typography variant='p' >
                Time Range
            </Typography>
            </div>

            <div style={ { display:'flex' } }>
            <Stack component="form" noValidate spacing={3}>
                <TextField
                id="date"
                label="Start Time"
                type="date"
                variant="standard"
                onChange={ (event) => {
                    props.setState((prevState) => ({
                    ...prevState,
                    startTime:new Date(event.target.value).toLocaleDateString('en-GB').split('/').reverse().join('-')
                    })) 
                } }
                value={ historyState.startTime }
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Stack>

            <Stack component="form" noValidate spacing={3}>
                <TextField
                id="date"
                label="End Time"
                type="date"
                onChange={ (event) => {
                    props.setState((prevState) => ({
                    ...prevState,
                    endTime :new Date(event.target.value).toLocaleDateString('en-GB').split('/').reverse().join('-')
                    })) 
                } }
                value={ historyState.endTime }
                variant="standard"
                sx={{ marginLeft:'1.527vw', width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                />
            </Stack>
            </div>

            <div style={ { margin:'1.25vw 0 1.25vw 0' } }>
            <Button 
            color='inherit' 
            sx={ { ...styles.Button, backgroundColor: historyState.statusSwitch[0]==='All'?'#2F80ED':'#152766' } }
            onClick={ () => { props.setState((prevState) => ({ ...prevState, statusSwitch:[ 'All', 'succeed', 'rejected' ] }) ) } }
            >
                <Typography variant='p'>
                    All
                </Typography>
            </Button>

            <Button 
            color='inherit'
            sx={ { ...styles.Button, backgroundColor: historyState.statusSwitch[0]==='succeed'?'#2F80ED':'#152766' } }
            onClick={ () => { props.setState((prevState) => ({ ...prevState, statusSwitch:[ 'succeed' ] }) ) } }
            >
                <Typography variant='p'>
                    Succeed
                </Typography>
            </Button>
            
            <Button 
            color='inherit'
            sx={ { ...styles.Button, backgroundColor: historyState.statusSwitch[0]==='rejected'?'#2F80ED':'#152766' } }
            onClick={ () => { props.setState((prevState) => ({ ...prevState, statusSwitch:[ 'rejected' ] }) ) } }
            >
                <Typography variant='p'>
                    Rejected
                </Typography>
            </Button>
            </div>

            <BasicTable statusSwitch={ historyState.statusSwitch } userInfo={ historyState.user } time={ { startTime:historyState.startTime, endTime:historyState.endTime } } />

        </div>
    )
}