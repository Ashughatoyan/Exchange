import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import { Box } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

const style = {
    Box:{
      border:'1px solid rgb(229, 232, 236)',
      width:'450px',
      margin:'1.5vw auto 8vw auto',
      borderRadius:20,
      backgroundColor:'white',
      boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px',
      display:'flex',
    },

    BoxFirst: {
        display:'flex',
        alignItems: 'center',
        flexDirection: 'column',
    },
}

export function GuideSection() {
  return (
    <Box style={ style.Box } >

<Box sx={ {width:'29%',paddingTop:'8px',} } >
    <Timeline>
      <TimelineItem sx={ {height:135} }>
        <TimelineSeparator >
          <TimelineDot sx={ {backgroundColor:'rgb(23,127,255)'} }/>
          <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>Step&nbsp;1</TimelineContent>
      </TimelineItem>
      <TimelineItem sx={ {height:135} }>
        <TimelineSeparator>
          <TimelineDot sx={ {backgroundColor:'rgb(23,127,255)'} } />
          <TimelineConnector/>
        </TimelineSeparator>
        <TimelineContent>Step&nbsp;2</TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot sx={ {backgroundColor:'rgb(23,127,255)'} }/>
        </TimelineSeparator >
        <TimelineContent>Step&nbsp;3</TimelineContent>
      </TimelineItem>
    </Timeline>
    </Box>


    <Box style={ style.BoxFirst } >
      <List sx={{ width: '90%', maxWidth: 1000, bgcolor: 'background.paper', margin: '5% 0'}}>
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Insert USD"
            secondary={
              <React.Fragment>
                
                {" - value must be greater then 15 and not above 100 when you insert USD value you can see how much USDC you will get in the next stroke"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Insert youre wallet address"
            secondary={
              <React.Fragment>
                {" — Make sure that you fill youre wallet address corectly and it can handle USDC otherwase youre Coins will be stolen"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider variant="middle" />
        <ListItem alignItems="flex-start">
          <ListItemText
            primary="Insert youre Bank card number..."
            secondary={
              <React.Fragment>
                
                {' — this step will do stripe so all youre bank card information woulde have only strype'}
              </React.Fragment>
            }
          />
        </ListItem>
      </List>
    </Box>

    </Box>
  );
}