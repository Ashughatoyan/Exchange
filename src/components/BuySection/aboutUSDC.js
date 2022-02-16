import React from 'react'
import { Box } from '@mui/system'

const style = {

    Box:{
        width:'450px',
        margin:'1.5vw auto 8vw auto',
        borderRadius:5,
        boxShadow: 'rgb(0 0 0 / 10%) 0px 20px 25px, rgb(0 0 0 / 4%) 0px 10px 10px',
        backgroundColor:'#fff',
        textAlign:'center',
        height:300,
        height:'fit-content',
        display:'flex',
        flexDirection:'column',
    },

    SecondeBox:{
        width:'90%',
        textAlign:'center',
        margin:'50px auto 40px auto'
    },

    h1:{
        marginTop:'10px',
        fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
        fontWeight:400,
        fontSize:'1.3rem',
        lineeight:'1.5',
        letterSpacing:'0.00938em',
    },

    p:{
        fontFamily:'"Roboto","Helvetica","Arial",sans-serif',
        fontWeight: 400,
        fontSize:'0.875rem',
        lineHeight:'1.43',
        letterSpacing:'0.01071em',
        color:'rgba(0, 0, 0, 0.6)',
    }
};

export default function AboutUSDC(){
    return(
        <Box sx={ style.Box } >
            <Box style={style.SecondeBox} >
                <img src="usdc.svg" style={ {marginBottom: '10px',width:'100px'} }/>
                <h1 style={ style.h1 }>An open source, smart contract-based stablecoin</h1>
                <p style={style.p} >True financial interoperability requires a price 
                    stable means of value exchange. Centre’s technology 
                    for fiat-backed stablecoins brings stability to crypto. 
                    The initial implementation is USD Coin (USDC), available 
                    as an Ethereum ERC-20, Algorand ASA, Avalanche ERC-20, 
                    Hedera SDK, Solana SPL, Stellar asset, and TRON TRC-20, 
                    and creating possibilities in payments, lending, 
                    investing, trading and trade finance — and the ecosystem 
                    will grow as other fiat currency tokens are added.
                </p>
            </Box>
        </Box>
    )
}