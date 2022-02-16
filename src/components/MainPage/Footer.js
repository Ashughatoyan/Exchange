import React from 'react';
import logo from '../../images/logo.png';
import Visa from '../../images/Visa.png';
import Mastercard from '../../images/Mastercard.png';
import { Box, IconButton, Typography } from '@mui/material';
import { Link } from "react-router-dom";

let styles = {
  footer:{
    backgroundColor:'#0D0D2B',
    flexDirection:'column',
    width:'100%',
    display:'flex',
    paddingTop:'4vw',
    paddingBottom:'4vw'
  },
  footerTop:{
    display:'flex',
    justifyContent:'space-evenly',
  },
  footerBottom:{
    marginTop:'4vw',
    marginLeft:'9vw'
  },
  logo:{
    width:'12vw',
    height:'1.8vw'
  },
  cardsBox:{
    marginTop:'2vw',
    display:'flex',
    justifyContent:'space-around'
  },
  sectionTitle:{
    color:'white',
    fontFamily: 'Rubik',
    fontSize: '1.5vw',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '30px',
    letterSpacing: '0em',
    textAlign: 'left'
  },
  sectionLink:{
    color:'#F2F2F2',
    fontFamily: 'Rubik',
    fontSize: '1.2vw',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '2.63vw',
    letterSpacing: '0em',
    textAlign: 'left'
  },
  paymentSystemTitle:{
    color:'white',
    fontFamily: 'Rubik',
    fontSize: '2.3vw',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '3.33vw',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  convexRights:{
    color:'white',
    fontFamily: 'Rubik',
    fontSize: '1.2vw',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '28px',
    letterSpacing: '0.01em',
    textAlign: 'left',
  },
  cardImg:{
    width:'8vw',
    height:'5vw'
  },
  routingLink: {
    textDecoration: 'none',
    color:'#fff'
},
}
function Footer(){
  return (
  <Box sx={ styles.footer }>
    <Box sx={ styles.footerTop }>
      <Box sx={ styles.imgBox }>
        <IconButton>
          <img style={ styles.logo } src={ logo }/>
        </IconButton>
      </Box>
      <Box>
        <Typography sx={ styles.sectionTitle } >
          Quick Link
        </Typography>
        <Link to="about" style={ styles.routingLink } >
          <Typography sx={styles.sectionLink}>
            About
          </Typography>
        </Link>
        <Link to="buysection" style={ styles.routingLink } >
          <Typography sx={ styles.sectionLink }>
            Buy
          </Typography>
        </Link>
        <Link to="contact" style={ styles.routingLink } >
          <Typography sx={ styles.sectionLink }>
            Contact
          </Typography>
        </Link>
        <Link to="sign" state={{ from: 'signIn' }} style={ styles.routingLink } >
          <Typography sx={ styles.sectionLink }>
            Login
          </Typography>
        </Link>
        <Link to="sign" state={{ from: 'signUp' }} style={ styles.routingLink } >
          <Typography sx={ styles.sectionLink }>
            Registration
          </Typography>
        </Link>
      </Box>
      <Box>
          <Typography sx={ styles.sectionTitle }>
            Resources
          </Typography>
          {/*<Typography sx={ styles.sectionLink }>
            Smart Token
          </Typography>
          <Typography sx={ styles.sectionLink }>
            Blockchain Explorer
          </Typography>
          <Typography sx={ styles.sectionLink }>
            Crypto API
          </Typography>*/}
      </Box>
      <Box>
        <Box>
          <Typography sx={ styles.paymentSystemTitle }>
            We accept following<br/>payment systems
          </Typography>
        </Box>
        <Box sx={ styles.cardsBox }>
          <img style={ styles.cardImg } src={ Visa }/>
          <img style={ styles.cardImg } src={ Mastercard }/>
        </Box>
      </Box>
    </Box>
      <Box sx={ styles.footerBottom }>
        <Typography sx={ styles.convexRights }>©2022 CONVEX. All rights reserved</Typography>
      </Box>
  </Box>)
}

export default Footer;