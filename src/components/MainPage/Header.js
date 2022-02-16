import React, { useState,useEffect } from 'react';
import logo from '../../images/logo.png';
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Illustration from '../../images/Illustration.png';
import Illustration1 from '../../images/Illustration1.png';
import backgroundImg1 from '../../images/backgroundImg1.png';
import paymentIcon from '../../images/paymentIcon.png';
import transactionsIcon from '../../images/transactionsIcon.png';
import dashboardIcon from '../../images/dashboardIcon.png';
import divider from '../../images/divider.png';
import { Link } from "react-router-dom";
import { auth } from "../../functions/requests.js"
import { onAuthStateChanged, signOut } from "firebase/auth";

const styles = {
    routingLink: {
        textDecoration: 'none',
    },
    header: {
        background: '#0D0D2B',
        backgroundImage: `url(${backgroundImg1})`,
    },
    logoImg: {
        width: '11.875vw'
    },
    toolBar: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '3.8vw',
        paddingLeft: '8.3vw',
        paddingRight: '8.3vw'
    },
    navBar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    navBarButton: {
        textTransform: 'none',
        height: '100%',
    },
    divider: {
        marginRight: '1.67vw'
    },
    navBarButtonText: {
        margin: '0 1.12vw',
        fontFamily: 'Rubik',
        fontSize: '1.2vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '1.2vw',
        letterSpacing: '0.01em',
        textAlign: 'left'
    },
    navBarRegisterButton: {
        borderRadius: '32px',
        backgroundColor: "#3671E9",
        textTransform: 'none',
        height: '3.6vw',
        width: '9vw',
        padding: '0.95vw'
    },
    valuePropositionBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: '5vw'
    },
    valueProposition: {
        fontFamily: 'Rubik',
        fontSize: '4.6vw',
        fontStyle: 'normal',
        fontWeight: 300,
        lineHeight: '5.2vw',
        letterSpacing: '0em',
        textAlign: 'left',
    },
    valuePropositionDescription: {
        fontFamily: 'Rubik',
        fontSize: '1.1vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '1.9vw',
        letterSpacing: '0.01em',
        textAlign: 'left',
    },
    startNowButton: {
        background: '#3671E9',
        textTransform: 'none',
        height: '4.4vw',
        width: '12.7vw',
        borderRadius: '32px',
        padding: '1.1vw 1.1vw 1.1vw 1.1vw'
    },
    headerValueProposition: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: '3.54vw',
        marginBottom: '9.65vw',
        padding: '0 8.3vw'
    },
    startNowText: {
        fontFamily: 'Rubik',
        fontSize: '1.3vw',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '1.9vw',
        letterSpacing: '0em',
        textAlign: 'center',
    },
    bitcoinIllustrationImg: {
        width: '36.6vw',
        height: '36.6vw'
    },
    sectionBox: {
        display: 'flex',
        width: '28vw',
        height: '7.5vw',
        flexDirection: 'row'
    },
    sectionTitle: {
        fontFamily: 'Rubik',
        fontSize: '2.9vw',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '4.3vw',
        letterSpacing: '0em',
        textAlign: 'left'
    },
    sectionIcon: {
        marginRight: '2.8vw',
        width: '5.8vw',
        height: '5.8vw'
    },
    sectionText: {
        fontFamily: 'Rubik',
        fontSize: '1.1vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '2vw',
        letterSpacing: '0.01em',
        textAlign: 'left'
    },
    sectionsBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    aboutConvexBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: '5.5vw',
        marginBottom: '6.94vw'
    },
    aboutConvex: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    aboutConvexTextBox: {
        marginBottom: '2.23vw'
    },
    aboutConvexTitle: {
        fontFamily: 'Rubik',
        fontSize: '2.9vw',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '4.3vw',
        letterspacing: '0em',
        textAlign: 'left',
        marginBottom: '1.67vw'
    },
    aboutConvexText: {
        fontFamily: 'Rubik',
        fontSize: '1.1vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '2vw',
        letterSpacing: '0.01em',
        textAlign: 'left'
    },
    learnMoreButton: {
        background: '#3671E9',
        textTransform: 'none',
        height: '4.3vw',
        width: '10.6vw',
        borderRadius: '32px',
        padding: '1.1vw, 1.7vw, 1.1vw, 1.7vw'
    },
    learnMore: {
        fontFamily: 'Rubik',
        fontSize: '1.3vw',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: '1.9vw',
        letterSpacing: '0em',
        textAlign: 'center',
    },
    aboutIllustration: {
        width: '47vw',
        height: '34.6vw'
    }
}

function LoginUserName(){
    
    const [ firebaseState, setFirebaseState ] = useState( { isLoggedIn: false } );

    useEffect( () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                //const uid = user.uid;
                // ...
                console.log( user );
                setFirebaseState( { isLoggedIn: true, user:user } )
            } else {
                // User is signed out
                // ...
                console.log('not login');
            }
        })
    },[])

    function signOutWrapper(){
        signOut(auth).then(() => {
            setFirebaseState( { isLoggedIn: false }  )
        }).catch((error) => {
            console.log('during log aut accure an error')
        });
    }

    if(!firebaseState.isLoggedIn){
        return (
            <>
                <Link to="sign" state={{ from: 'signIn' }} style={ { ...styles.routingLink,color: '#fff' } } >
                    <Button color='inherit' sx={styles.navBarButton}>
                        <Typography sx={styles.navBarButtonText} variant='p'>
                            Login
                        </Typography>
                    </Button>
                </Link>
                <img src={divider} style={styles.divider} />
                <Link to="sign" state={{ from: 'signUp' }} style={ { ...styles.routingLink,color: '#fff' } } >
                    <Button variant='contained' sx={styles.navBarRegisterButton}>
                        <Typography sx={styles.navBarButtonText} variant='p'>
                            Register
                        </Typography>
                    </Button>
                </Link>
            </>
        )
    }
    else{
        return(
            <>
                <Link to="dashboard" style={ { ...styles.routingLink,color: '#fff' } } >
                    <Button color='inherit' sx={styles.navBarButton}>
                        <Typography sx={styles.navBarButtonText} variant='p'>
                        Dashboard
                        </Typography>
                    </Button>
                </Link>
                <img src={divider} style={ { ...styles.divider,marginRight: '0.6vw' } } />
                <Button onClick={signOutWrapper} variant='contained' sx={ { ...styles.navBarRegisterButton, width:'fit-content' } }>
                    <Typography sx={ styles.navBarButtonText } variant='p'>
                        { firebaseState.user.displayName + ' | Log Out' }
                    </Typography>
                </Button>
            </>
        )
    }

}

export default function Header() {
    return (
        <AppBar position='relative' sx={styles.header}>
            <Toolbar style={ styles.toolBar } >
                <IconButton>
                    <img src={logo} style={styles.logoImg}></img>
                </IconButton>
                <Box component='span' sx={styles.navBar}>
                    <Link to="about" style={ { ...styles.routingLink,color: '#fff' } } >
                        <Button color='inherit' sx={styles.navBarButton}>
                            <Typography sx={styles.navBarButtonText} variant='p'>
                                About
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="/buysection" style={ { ...styles.routingLink,color: '#fff' } } >
                        <Button color='inherit' sx={styles.navBarButton}>
                            <Typography sx={styles.navBarButtonText} variant='p'>
                                Buy
                            </Typography>
                        </Button>
                    </Link>
                    <Link to="contact" style={ { ...styles.routingLink,color: '#fff' } } >
                        <Button color='inherit' sx={styles.navBarButton}>
                            <Typography sx={styles.navBarButtonText} variant='p'>
                                Contact
                            </Typography>
                        </Button>
                    </Link>
                    <LoginUserName/>
                </Box>
            </Toolbar>
            <Box sx={styles.headerValueProposition}>
                <Box sx={styles.valuePropositionBox}>
                    <Box variant='div'>
                        <Typography sx={styles.valueProposition} variant='h2'>
                            Fastest & Secure <br />
                            Platform to Buy <br />
                            Crypto<br />
                        </Typography>
                    </Box>
                    <Box sx={styles.valueDescriptionBox} variant='div'>
                        <Typography sx={styles.valuePropositionDescription} variant='p'>
                            Buy and sell cryptocurrencies, trusted by 10M wallets<br /> with over $30 billion in transactions.
                        </Typography>
                    </Box>
                    <Box variant='div'>
                    <Link to="buysection" style={ { ...styles.routingLink,color: '#fff' } } >
                        <Button variant="contained" sx={styles.startNowButton}>
                            <Typography sx={styles.startNowText} variant='p'>
                                Start Now
                            </Typography>
                        </Button>
                    </Link>
                    </Box>
                </Box>
                <Box>
                    <img src={Illustration} style={styles.bitcoinIllustrationImg} />
                </Box>
            </Box>
            <Box sx={styles.sectionsBox}>
                <Box sx={styles.sectionBox}>
                    <Box>
                        <img src={paymentIcon} style={styles.sectionIcon} />
                    </Box>
                    <Box>
                        <Typography variant='h3' sx={styles.sectionTitle}>Payment</Typography>
                        <Typography variant='p' sx={styles.sectionText}>convenient and fast system</Typography>
                    </Box>
                </Box>
                <Box sx={styles.sectionBox}>
                    <Box>
                        <img src={dashboardIcon} style={styles.sectionIcon} />
                    </Box>
                    <Box>
                        <Typography variant='h3' sx={styles.sectionTitle}>Dashboard</Typography>
                        <Typography variant='p' sx={styles.sectionText}>history of your transactions</Typography>
                    </Box>
                </Box>
                <Box sx={styles.sectionBox}>
                    <Box>
                        <img src={transactionsIcon} style={styles.sectionIcon} />
                    </Box>
                    <Box>
                        <Typography variant='h3' sx={styles.sectionTitle}>Transactions</Typography>
                        <Typography variant='p' sx={styles.sectionText}>to any wallet without limitation</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={styles.aboutConvexBox}>
                <Box>
                    <img src={Illustration1} style={styles.aboutIllustration}></img>
                </Box>
                <Box sx={styles.aboutConvex}>
                    <Box sx={styles.aboutConvexTextBox} >
                        <Typography variant='h2' sx={styles.aboutConvexTitle}>Why you should choose <br /> CONVEX</Typography>
                        <Typography variant='p' sx={styles.aboutConvexText}>Experience the next generation cryptocurrency<br /> platform. No financial borders, extra fees, and fake<br /> reviews.</Typography>
                    </Box>
                    {/*<Button variant="contained" sx={styles.learnMoreButton}>
                        <Typography sx={styles.learnMore}>
                            Learn More
                        </Typography>
                    </Button>*/}
                </Box>
            </Box>
        </AppBar>
    )
}