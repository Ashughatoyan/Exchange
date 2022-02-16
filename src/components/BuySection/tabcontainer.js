import React from 'react';
import PropTypes from "prop-types";
import { Typography } from '@mui/material';

export default function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}