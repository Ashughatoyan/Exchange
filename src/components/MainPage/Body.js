import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Chart from '../../images/Chart.svg';
import Statistic from '../../images/Statistic.svg';
import TablePng from '../../images/Table.svg';
import Bitcoin from '../../images/Bitcoin.svg';
import Ethereum from '../../images/Ethereum.svg';
import Litecoin from '../../images/Litecoin.svg';
import Backgroundo from '../../images/o.png';

const styles = {
    tradeSecurlyBox: {
        paddingBottom: '9.1vw',
        background: 'linear-gradient(180deg, #F8F9FB 0%, #FAFBFF 100%)',
        display:'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    tradeSecurlyTypography: {
        width: '80vw',
        minWidth: '700px',
        marginTop: '9.1vw',
        fontSize:'0.7vw',
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '2.7vw',
        lineHeight: '3vw',
        textAlign: 'center',
        color: '#0D0D2B',
        textShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'
    },
    pricetable: { 
        width: '100%',
        marginTop: '4.45vw',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    cryptoBox: {
        width: '25.6vw',
        height: '30vw',
        maxWidth: '370px',
        maxHeight: '433px',
        borderRadius: '12px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#FFF',
        transition: '0.4s',
        '&:hover': {
            backgroundColor: '#2B076E',
            color: '#FFF',
         },
    },
    cryptoBoxIcon: {
        height: '5.5vw',
        width: '5.5vw',
        margin: '0.7vw 0 1.2vw'
    },
    cryptoBoxTitle: {
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '2.23vw',
        lineHeight: '3.34vw'
    },
    cryptoBoxTitleStroke: {
        display: 'inline-flex',
        justifyContent: 'center'
    },
    cryptoBoxSymbole: {
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '1.25vw',
        lineHeight: '1.87vw'
    },
    cryptoBoxText: {
        fontFamily: 'Rubik',
        fontStyle: 'normal',
        fontWeight: 'normal',
        width:'90%',
        fontSize: '1.12vw',
        lineHeight: '1.9vw'
    },
    cryptoBoxBlueBox: {
        width: '13.3vw',
        height: '3.45vw',
        backgroundColor: '#3671E9',
        color: '#FFFFFF',
        borderRadius: '3vw'
    },
    cryptoBoxPrice: {
        lineHeight: '3.45vw'
    },
    purpleBox: {
        backgroundImage: `url(${Backgroundo})`,
        backgroundColor: '#2B076E',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    sectionBox: {
        width: '100%',
        display:'flex',
        marginTop: '6.94vw',
        justifyContent: 'space-around'
    },
    valuePropositionBox: {
        width: '28.3vw',
        height: '15.2vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        marginTop: '2.5vw'
    },
    valueProposition: {
        fontFamily: 'Rubik',
        fontSize: '2.23vw',
        fontStyle: 'normal',
        fontWeight: 300,
        lineHeight: '3vw',
        letterSpacing: '0em',
        textAlign: 'left',
        color: '#FFFFFF'
    },
    valuePropositionDescription: {
        fontFamily: 'Rubik',
        fontSize: '1.12vw',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '1.94vw',
        letterSpacing: '0.01em',
        textAlign: 'left',
        color: '#FFFFFF'
    },
    startNowButton: {
        background: '#3671E9',
        textTransform: 'none',
        height: '4.1vw',
        width: '11.5vw',
        borderRadius: '32px',
        padding: '1.1vw 1.1vw 1.1vw 1.1vw'
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
}

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

export default function Body(){

    const [ obj, setobj ] = useState();

    useEffect( async function(){
        //console.time()
        try {
            const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,ETH,LTC');
            await setobj( { 
                BTC:response.data.USD,
                ETH:(response.data.USD/response.data.ETH).toFixed(2),
                LTC:(response.data.USD/response.data.LTC).toFixed(2)
            } );
          }
          catch (err) {
            console.log('fetch failed', err);
          }
        //console.timeEnd()
        
    },[]);

    //console.log(obj);

    return(
        <>
        <Box sx={ styles.tradeSecurlyBox } >
            
            <Typography sx={ styles.tradeSecurlyTypography } variant='p'>
                Trade securely and market the high growth cryptocurrencies.
            </Typography>

            <Box sx={ styles.pricetable } >
            
                <Box sx={ styles.cryptoBox }>
                    <img src={Bitcoin} style={ styles.cryptoBoxIcon } />
                    <Box sx={ styles.cryptoBoxTitleStroke } >
                        <Typography sx={ styles.cryptoBoxTitle }>
                            Bitcoin&nbsp;
                        </Typography>
                        <Typography sx={ styles.cryptoBoxSymbole } >
                            BTC
                        </Typography>
                    </Box>
                    <Typography sx={ styles.cryptoBoxText }>
                        Digital currency in which a record of transactions is maintained.
                    </Typography>
                    <Box sx={ styles.cryptoBoxBlueBox } >
                        <Typography sx={ styles.cryptoBoxPrice }>
                            {obj ? obj.BTC + ' USD' : '...' }
                        </Typography>
                    </Box>
                </Box>

                <Box sx={ styles.cryptoBox }>
                    <img src={Ethereum} style={ styles.cryptoBoxIcon } />
                    <Box sx={ styles.cryptoBoxTitleStroke } >
                        <Typography sx={ styles.cryptoBoxTitle }>
                            Ethereum&nbsp;
                        </Typography>
                        <Typography sx={ styles.cryptoBoxSymbole } >
                            ETH
                        </Typography>
                    </Box>
                    <Typography sx={ styles.cryptoBoxText }>
                        Blockchain technology to create and run decentralized digital applications.
                    </Typography>
                    <Box sx={ styles.cryptoBoxBlueBox } >
                        <Typography sx={ styles.cryptoBoxPrice }>
                            {obj ? obj.ETH + ' USD' : '...' }
                        </Typography>
                    </Box>
                </Box>

                <Box sx={ styles.cryptoBox }>
                    <img src={Litecoin} style={ styles.cryptoBoxIcon } />
                    <Box sx={ styles.cryptoBoxTitleStroke } >
                        <Typography sx={ styles.cryptoBoxTitle }>
                            Litecoin&nbsp;
                        </Typography>
                        <Typography sx={ styles.cryptoBoxSymbole } >
                            LTC
                        </Typography>
                    </Box>
                    <Typography sx={ styles.cryptoBoxText }>
                        Cryptocurrency that enables instant payments to anyone in the world.
                    </Typography>
                    <Box sx={ styles.cryptoBoxBlueBox } >
                        <Typography sx={ styles.cryptoBoxPrice }>
                            {obj ? obj.LTC + ' USD' : '...' }
                        </Typography>
                    </Box>
                </Box>
            
            </Box>

        </Box>

        <Box sx={ styles.purpleBox } >
        
            <Typography sx={ { ...styles.tradeSecurlyTypography,color: '#FFFFFF',textShadow: 'none' } } variant='p'>
                Market sentiments, portfolio, and run the infrastructure of your choice
            </Typography>

            <Box sx={ styles.sectionBox } >
                
                <Box sx={styles.valuePropositionBox}>
                    <Box variant='div'>
                        <Typography sx={styles.valueProposition} variant='h2'>
                            Invest Smart
                        </Typography>
                    </Box>
                    <Box sx={styles.valueDescriptionBox} variant='div'>
                        <Typography sx={styles.valuePropositionDescription} variant='p'>
                            Get full statistic information about the behaviour of buyers 
                            and sellers will help you to make the decision.
                        </Typography>
                    </Box>
                    {/*<Button variant="contained" sx={styles.startNowButton}>
                        <Typography sx={styles.startNowText} variant='p'>
                            Learn more
                        </Typography>
                    </Button>*/}
                </Box>
            
                <img src={Chart} style={ { width: '40.2vw' } } />

            </Box>

            <Box sx={ { ...styles.sectionBox,marginTop: '8.3vw' } } >
                
                <img src={Statistic} style={ { width: '40.2vw' } } />
                
                <Box sx={ styles.valuePropositionBox }>
                    <Box variant='div'>
                        <Typography sx={ styles.valueProposition } variant='h2'>
                            Integreated Stripe system
                        </Typography>
                    </Box>
                    <Box sx={styles.valueDescriptionBox} variant='div'>
                        <Typography sx={ styles.valuePropositionDescription } variant='p'>
                            only an integrated payment system will save your bank card details
                        </Typography>
                    </Box>
                    {/*<Button variant="contained" sx={ styles.startNowButton }>
                        <Typography sx={styles.startNowText} variant='p'>
                            Learn more
                    </Typography>
                    </Button>*/}
                </Box>

            </Box>

            <Box sx={ { ...styles.sectionBox,marginTop: '8.3vw',marginBottom: '8.3vw' } } >
                <Box sx={ { ...styles.valuePropositionBox,height: '24vw' } }>
                    <Box variant='div'>
                        <Typography sx={styles.valueProposition} variant='h2'>
                            Grow your profit and track your investments
                        </Typography>
                    </Box>
                    <Box sx={styles.valueDescriptionBox} variant='div'>
                        <Typography sx={styles.valuePropositionDescription} variant='p'>
                            Use advanced analytical tools. Clear TradingView charts let you
                            track current and historical profit investments.
                        </Typography>
                    </Box>
                    {/*<Button variant="contained" sx={styles.startNowButton}>
                        <Typography sx={styles.startNowText} variant='p'>
                            Learn more
                        </Typography>
                    </Button>*/}
                </Box>
            
                <img src={TablePng} style={ { width: '40.2vw' } } />

            </Box>

        </Box>
        </>
    )
}