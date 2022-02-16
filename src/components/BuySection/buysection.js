import React, { useState, useEffect } from 'react';
import { BasicSelect, Fun } from "./basicselect";
import { Alert, Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { pushHistory, getHistory } from "../../functions/requests.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth } from "../../functions/requests.js"
import {  onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";

const style = {
    Box: {
        border:'1px solid rgb(229, 232, 236)',
        width:'450px',
        margin:'1.5vw auto 8vw auto',
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
    },

    description:{
        fontFamily: 'Montserrat',
        fontSize: '16px',
        fontWeight: 300,
        lineHeight: '24px',
        color: '#262626',
    }
}

export const BuySection = () => {

    async function getuser(){let x = await getAuth().currentUser;return x}

    const [ price, setPrice ] = useState( { USD:0,USDC:0,wallet:'' } )

    const [ putErrorProps, setputErrorProps ] = useState( { USDinputERR:false,WalletInputERR:false } );

    const [ alert, setAlert ] = useState( ' ' )

    const [ isLoggedIn, setIsLoggedIn ] = useState( { isLoggedIn: false } )

    let navigate = useNavigate();


    function fetchForPassCheckoutInfo( USDTquantity, price ){

        fetch('create-checkout-session', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body : JSON.stringify({
                items: [ { mail: isLoggedIn.user.email, quantity: Number(USDTquantity) } ],
                data: price
            })
        }).then(res => {
            if (res.ok){return res.json()}
            return res.json().then(json => Promise.reject(json))
        }).then( ( { url } ) => {
            window.location = url
            //setTimeout( () => {navigate( url, { replace: true }) }, 1500 );
        }).catch(e => {
            console.error(e.error); 
        })
        
    }

    function returnMenuItem( { Method, Fee} ){
        setPrice((prevState) => ( {...prevState, USDC:getPercent(price.USD,Fee,true), paymentMethod:Method, paymentFee: Fee} ) )
    }

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //const uid = user.uid;
                // ...
                setIsLoggedIn( { isLoggedIn: true, user: user } )
                setPrice((prevState) => ( {...prevState, user: user.uid } ) )
            } else {
                // User is signed out
                // ...
                console.log('not login');
            }
        })
    },[])

    useEffect(() => {},[price])

    function checkBeforeRequest(){
        
        if( !isLoggedIn.isLoggedIn ){
            setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
                Please <Link to="../sign" state={{ from: 'signIn' }} >Login</Link> before purchase
            </Alert>)
        }

        else if( price.USD < 15 ){
            setputErrorProps((prevState) => ({ ...prevState,USDinputERR:true }) )
            setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            You must pay greater then 15 not above 100
            </Alert>)
            if( price.wallet.length < 10 ){
                setputErrorProps((prevState) => ({ ...prevState,WalletInputERR:true }) )
                setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
                Minimum you can buy for 15$, Wrong! crypto addres.
                </Alert>)
            };
        }

        else if( price.USD > 100 ){
            setputErrorProps((prevState) => ({ ...prevState,USDinputERR:true }) )
            setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            You must pay greater then 15 not above 100
            </Alert>)
            if( price.wallet.length < 10 ){
                setputErrorProps((prevState) => ({ ...prevState,WalletInputERR:true }) )
                setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
                maximum you can buy for 100$, Wrong! crypto addres.
                </Alert>)
            };
        }

        else if( price.wallet.length<10 ){
            setputErrorProps((prevState) => ({ ...prevState,WalletInputERR:true }) )
            setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            Wrong! crypto addres
            </Alert>)
        }
        
        else if( !getuser() ){
            //console.log('login exi')
            setAlert(<Alert severity="error" sx={ {margin:"0 5% 0 5%"} }>
            Please <Link to="sign">login</Link> to your account before purchasing.
            </Alert>)
        };

        if(price.USD > 15 && price.wallet.length>=10 && getuser()){
            
            //console.log(price)

            fetchForPassCheckoutInfo( price.USD, price );

            //if(putErrorProps.WalletInputERR){console.log(putErrorProps.WalletInputERR)}
            
            setAlert(<Alert 
                        severity="success" 
                        color="info"
                        sx={ {margin:"0 5% 0 5%"} }
                    >
                    Success the deal was done !
                    </Alert>
            )
        };
    }

    function getPercent( num, percent, up_down){
        if(up_down){
            return Number( (num*(100-percent)/100/1.05).toFixed(2) )
        }
        else{
            return Number( (num*1.05*100/(100-percent)).toFixed(2) )
        };
    }

    return(
        <Box sx={ style.Box } >
            <h1 style={ style.h1 }>Buy USDC</h1>
            <TextField
                error={ putErrorProps.USDinputERR }
                sx={ style.TextField }
                id="standard-basic"
                label="USD"
                type="number"
                variant="standard"
                autoFocus={ true }
                onInput={ (event) => {
                    if(putErrorProps.USDinputERR===true){setputErrorProps((prevState) => ({ ...prevState,USDinputERR:false }) ) }
                    setPrice((prevState) => ({...prevState, USD:Number(event.target.value), USDC:getPercent(event.target.value, price.paymentFee, true) }) ) 
                    }
                }
                value={price.USD<0.01?'':price.USD}
            />
            <TextField
                sx={ style.TextField }
                id="standard-basic"
                label="You will get USDC"
                type="number"
                variant="standard"
                onInput={ (event) => {
                    setPrice((prevState) => ({...prevState, USD:getPercent(event.target.value, price.paymentFee, false), USDC:Number(event.target.value) }) ) 
                    }
                }
                value={price.USDC<0.01?'':price.USDC}
            />
            <TextField
                error={ putErrorProps.WalletInputERR }
                sx={ style.TextField }
                id="standard-basic"
                label="Your Wallet"
                variant="standard"
                onChange={(event) => {
                    if(putErrorProps.WalletInputERR===true){setputErrorProps((prevState) => ({ ...prevState,WalletInputERR:false }) ) }
                    setPrice((prevState) => ({ ...prevState,wallet:event.target.value }) ) 
                     }
                }
            />
            <BasicSelect funcReturnValue={returnMenuItem} />
            {alert}
            <Button variant="contained" sx={ style.Button } onClick={() => { checkBeforeRequest() } }>buy</Button>

        </Box>
    )
}