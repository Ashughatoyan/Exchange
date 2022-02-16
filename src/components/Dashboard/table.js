import React,{ useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { auth, app } from "../../functions/requests.js"
import { query } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, child, orderByChild, equalTo } from "firebase/database";
import { getAuth } from "firebase/auth";

const styles = {
  td: {
    padding: '5px 20px',
    fontSize: '1vw'
  }
}

/*function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}*/

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function BasicTable( props ) {
  
    //let force = useForceUpdate();

    //async function getUserData(){ let x = await getAuth().currentUser; return x };

    const [ isLoggedIn, setIsLoggedIn ] = useState( { 
        isLoggedIn: false,
        showWithStatus: props.statusSwitch,
        rows: new Array(),
        startTime: props.time.startTime,
        endTime: props.time.endTime
    } )

    const prevAmount = usePrevious( { showWithStatus:props.statusSwitch, startTime: props.time.startTime, endTime: props.time.endTime } );

    useEffect(() => {
        if(prevAmount !== { showWithStatus:props.statusSwitch, startTime: props.time.startTime, endTime: props.time.endTime } ) {
            setIsLoggedIn((prevState) => ({ ...prevState, showWithStatus: props.statusSwitch, startTime:props.time.startTime, endTime:props.time.endTime }) )
        }
    }, [ props.statusSwitch, props.time ])
    
    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setIsLoggedIn((prevState) =>  ({ ...prevState, isLoggedIn: true, user: user }) )
          } else {
            // User is signed out
            // ...
          }
        });
      },[])

    useEffect( async () => {
        if( isLoggedIn.user ){
        const dbRef = query( ref( getDatabase(app), "history"), orderByChild("user"), equalTo( isLoggedIn.user.uid ) );
        
        let rows = new Array();

        await get( dbRef ).then( ( snapshot ) => { 
            snapshot.forEach( ( item, index, array ) => {
            let list = item.val();
            rows.push( { 
                id: list.id,
                PaymentMethod:list.paymentMethod,
                USD:list.USD,
                Date:list.time,
                USDC:list.USDC,
                Wallet:list.wallet,
                Status:list.status } );
            })
        })
        setIsLoggedIn( (prevState) => ({ ...prevState, rows: rows }) )}
    },[ isLoggedIn.user ])

    if( !isLoggedIn.isLoggedIn ){
        return(
            <p>Please Login before purchase</p>
        )
    }
    
  else{
    return (
    <>  
        <div style={ { padding:"0px 20px 20px 20px",backgroundColor:'#fff' } }>

          <TableContainer component={Paper} sx={ { boxShadow: 'none', borderRadius:'unset', fontSize:'12px', width:'100%' } } >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
              <TableRow>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>checkout ID</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>Payment Method</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>Date</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>Total cost</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>USDC</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>Wallet</TableCell>
                  <TableCell sx={ { ...styles.td, borderBottom: '1px solid #000' } }>Status</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {isLoggedIn.rows.map((row, index) => {if (
                        isLoggedIn.showWithStatus.includes( row.Status ) &&
                        new Date( row.Date ).getTime() > (new Date( isLoggedIn.startTime ).getTime())-86388888 &&
                        new Date( row.Date ).getTime() < (new Date( isLoggedIn.endTime ).getTime())+86388888
                    ){ return(
                  <TableRow sx={ { borderBottom: '1px solid rgba( 0, 0, 0 )',fontFamily: 'monospace' } } key={ index + 'row' } >
                    <TableCell sx={ { padding: '5px 20px',color:'#007fff' } }>{ row.id.substr(0, 15) + '...' }</TableCell>
                    <TableCell sx={ styles.td }>{ row.PaymentMethod }</TableCell>
                    <TableCell sx={ styles.td }>{ row.Date }</TableCell>
                    <TableCell sx={ styles.td }>{ row.USD + ' $'}</TableCell> 
                    <TableCell sx={ styles.td }>{ row.USDC }</TableCell>
                    <TableCell sx={ styles.td }>{ row.Wallet }</TableCell>
                    <TableCell sx={ { padding: '5px 20px', color: (row.Status === 'succeed' ? '#2ecc71' : '#e84118') } }>{ row.Status }</TableCell>
                  </TableRow>
              )} } ) }
              </TableBody>
          </Table>
          </TableContainer>
      </div>
    </>)
  }
}