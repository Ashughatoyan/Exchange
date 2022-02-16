import React from 'react';
import { Typography } from '@mui/material';
import { Box } from "@mui/system";
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";

const styles = {

};

export default function About(){
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

            <Box sx={ {border: '1px solid rgb(229, 232, 236)',width: '60vw',maxWidth: '700px',margin: '5vw auto',borderRadius: '20px',backgroundColor: 'white',boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px',display: 'flex',flexDirection: 'column',alignItems: 'center'} } >
                <Typography sx={ { width: '80%',marginTop: '10%',fontFamily: 'Rubik',fontSize: '2.8vw',lineHeight: '6vw' } } >
                    What is convex
                </Typography>
                <Typography sx={ { width: '80%',fontFamily: 'Rubik',fontSize: '1.3vw',color: '#545454' } } >
                Convex is a platform for buying and selling USDC stablecoin, we do it quickly and safely, 
                there are limits to increase which you must verify your account.
                </Typography>
                <Divider variant="middle" sx={ { borderBottomWidth: '2px',width: '80%',margin: '2vw 0' } }/>
                <Typography sx={ { width: '80%',fontFamily: 'Rubik',fontSize: '2.8vw',lineHeight: '6vw' } } >
                    Security
                </Typography>
                <Typography sx={ { width: '80%',marginBottom: '10%',fontFamily: 'Rubik',fontSize: '1.3vw',color: '#545454' } } >
                    for payment, we use stripe, which is why all your payment information remains only with stripe. bank card payments
                    are available and apple pay and google pay will work in the near future. There is a convenient dashboard for 
                    managing your account where you will find all your purchases.
                </Typography>
            </Box>
        </>
    )
}