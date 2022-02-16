import React from "react";
import { Sign } from "../../functions/requests.js"
import { Link, useLocation } from "react-router-dom";

export default function SignPage( props ){
        
    const location = useLocation();
    const { from } = location.state;

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
                
            <Sign sign={ from }/>
        </>
    )
}