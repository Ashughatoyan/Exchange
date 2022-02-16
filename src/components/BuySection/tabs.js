import React from "react";
import PropTypes from "prop-types";
import { Button, Tab, Tabs, TextField } from "@mui/material";
import { Box, styled } from "@mui/system";
import TabContainer from "./tabcontainer";
import { BuySection } from "./buysection";
import { GuideSection } from "./guide";
import AboutUSDC from "./aboutUSDC";
import { Link } from "react-router-dom";

const styles = {
  
  Box: {
      width:'450px',
      margin:'1.5vw auto auto',
      borderRadius:10,
      boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px'
  },
  Tab: {
      statement1:{color:"#fff",width:'150px'},
      statement2:{color:"#c2e0ff",width:'150px'}
  },

  routingLink: {
    textDecoration: 'none'
  }

}

function Section(props){
  if(props.value === 0){return <AboutUSDC/>}
  else if(props.value === 1){return  <GuideSection/>}
  else{return <BuySection/>}
}

const StyledTabs = styled(({ className, ...other }) => {

  return (
    <Tabs
      {...other}
      classes={{
        root: className,
        flexContainer: "flexContainer",
        indicator: "indicator",
      }}
      variant="standard"
      TabIndicatorProps={{ children: <span /> }}
      
    />
  );
})({
  "& .indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 60,
      width: "100%",
      backgroundColor: "white"
    }
  },
  "& .flexContainer": {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    backgroundColor: "rgb(0, 127, 255)",

  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 2
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    
    return (
      <>
      <Link to="/" style={ styles.routingLink } >
        <div style={ {margin:"2.5vw auto",width:'fit-content'} } >
          <p style={ 
              {fontSize: 58,
              fontFamily: 'Aquire',
              margin: 0,
              color: 'rgb(0, 127, 255)',
              textShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 20%) 0px 10px 10px'
              } }>
              Convex
            </p>
        </div>
      </Link>

      <Box sx={ styles.Box }>
        <StyledTabs value={value} onChange={this.handleChange}>
          <Tab style={ value===0?styles.Tab.statement1:styles.Tab.statement2 } label="About USDC" />
          <Tab style={ value===1?styles.Tab.statement1:styles.Tab.statement2 } label="Guide" />
          <Tab style={ value===2?styles.Tab.statement1:styles.Tab.statement2 } label="Buy USDC" />
        </StyledTabs>
      </Box>
      
      <Section value={this.state.value}/>

      </>
    );
  }
}


export default SimpleTabs;

//{value === 0 && <TabContainer>Item One</TabContainer>}
//{value === 1 && <TabContainer>Item Two</TabContainer>}
//{value === 2 && <TabContainer>Item Three</TabContainer>}
