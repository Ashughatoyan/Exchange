import React, { useEffect, useState } from 'react';
import { FormControl, MenuItem, Select, InputLabel } from '@mui/material';

const style = {
  
  p:{
    fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
    fontWeight: 400,
    fontSize:'0.875rem',
    lineHeight:'1.43',
    margin:0,
    letterSpacing:'0.01071em',
    color:'rgba(0, 0, 0, 0.6)',
  },

  MenuItem:{
    height:'45px',
    display:'flex',
    justifyContent:'space-between'
  },

  FormControl:{
    width:"90%",
    margin:"5%"
  }

}

function DisplaySelect(value){
  if(value === 'VISA | MasterCard'){
    return <><img style={ {height:'15px'} } src="./visa.svg"/><img style={ {height:'25px',marginBottom:'-5px'} } src="mastercard.svg"/></>
  }
  else if(value === 'STRIPE'){
    return <img style={ {height:'15px'} } src="./stripe.svg"/>
  }
  else if(value === 'STRIPE'){
    return <img style={ {height:'15px'} } src="./stripe.svg"/>
  }
  else if(value === 'MasterCard'){
    return <img style={ {height:'20px'} } src="./mastercard1.svg" />
  }
  else{
    return <img style={ {height:'20px'} } src="./paypal.svg"/>
  }
}

export function BasicSelect( { funcReturnValue } ) {

    const [age, setAge] = useState('VISA | MasterCard');
    
    const feesTable = {
      "VISA | MasterCard": 0.3,
      "STRIPE": 0.5,
      "MasterCard" : 0.4,
      "PayPal" : 0.5
    }

    useEffect(() => {
      funcReturnValue( {Method:age,Fee:feesTable[age]} )
    }, [])

    const handleChange = (event) => {
      
      setAge(event.target.value);
      
      funcReturnValue( {Method:event.target.value,Fee:feesTable[event.target.value]} )

    };

    return (
        <FormControl variant="standard" sx={ style.FormControl }>
          <InputLabel id="demo-simple-select-label">Payment Service only card allowed</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
            disabled={ true }
            onChange={handleChange}
            renderValue={ (value) => {return DisplaySelect(value)} }
          >
            <MenuItem sx={ style.MenuItem } value={"VISA | MasterCard"}>
              <img style={ {height:'20px'} } src="visa.svg"/>
              <p style={ style.p }>0.3% fee</p>
            </MenuItem>

            <MenuItem sx={ style.MenuItem } value={"STRIPE"}>
              <img style={ {height:'20px'} } src="stripe.svg"/>
              <p style={ style.p }>0.3% fee</p>
            </MenuItem>

            <MenuItem sx={ style.MenuItem } value={"MasterCard"}>
              <img style={ {height:'40px',marginLeft:'-12px'} } src="mastercard.svg"/>
              <p style={ style.p }>0.4% fee</p>
            </MenuItem>

            <MenuItem sx={ style.MenuItem }  value={"PayPal"}>
              <img style={ {height:'20px'} } src="paypal.svg"/>
              <p style={ style.p } >0.5% fee</p>
            </MenuItem>

          </Select>
        </FormControl>
    );
  }