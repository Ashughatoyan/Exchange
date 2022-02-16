require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("public"));

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const price = 105;

var admin = require("firebase-admin");

var serviceAccount = require("./react-hooks-2f215-firebase-adminsdk-jv2nn-76c6024871.json");

var firebase = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://react-hooks-2f215-default-rtdb.firebaseio.com"
});

let data;

app.post('/create-checkout-session', async (req, res) => {
    data = req.body.data;
    try {
        console.log(req.body.items)
        if( req.body.items.filter( item => item.quantity < 15 || item.quantity > 100 ).length > 0 ){ return false }
        const session = await stripe.checkout.sessions.create({
            customer_email: req.body.items[0].mail,
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.items.map( item => {
                return{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'USDC'
                        },
                        unit_amount: price
                    },
                    quantity: item.quantity
                }
            }),
            success_url: `${process.env.SERVER_URL}/success?session_id={CHECKOUT_SESSION_ID}",`,
            cancel_url: `${process.env.SERVER_URL}/cancel?session_id={CHECKOUT_SESSION_ID}",`
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.get('/success', async (req, res) => {

    //console.log( 'this is data: ', data)

    const session = await stripe.checkout.sessions.retrieve( req.query.session_id.slice(0,66) );

    const customer = await stripe.customers.retrieve(session.customer);

    //console.log( session )

    firebase.database().ref('/history').push({
        ...data,
        status: session.payment_status==='paid' ? 'succeed' : 'rejected',
        email: session.customer_details.email,
        time: new Date().toLocaleString(),
        id: session.id
    });

    res.send(`
            <html>
                <body>
                    <p style='display: block;font-family: monospace;margin: 1em 0px;' >
                        Thanks for your order, ${customer.name}! <a href='${process.env.SERVER_URL}/dashboard' >Dashboard</a>
                    </p>
                </body>
            </html>`);
  });
  

    app.get('/cancel', async (req, res) => {

        const session = await stripe.checkout.sessions.retrieve( req.query.session_id.slice(0,66) );
        
        const session2 = await stripe.checkout.sessions.expire(
        session.id
        );

        firebase.database().ref('/history').push({
            ...data,
            status: session.payment_status==='paid' ? 'succeed' : 'rejected',
            email: session.customer_details.email,
            time: new Date().toLocaleString(),
            id: session.id
        });

        res.send(`
            <html>
                <body>
                    <p style='display: block;font-family: monospace;margin: 1em 0px;' >
                        Youre order was canceled, <a href='${process.env.SERVER_URL}/dashboard' >Dashboard</a>
                    </p>
                </body>
            </html>`);
    });

  app.listen(4242);