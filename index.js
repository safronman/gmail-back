// https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer

// https://stackoverflow.com/questions/12180552/openssl-error-self-signed-certificate-in-certificate-chain
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();

// ENV CONSTANTS
const PORT = process.env.PORT || 3010
const LOGIN = process.env.LOGIN || "fake-login"
const PASSWORD = process.env.PASSWORD || "fake-password"


// CORS
app.use(cors())

// BODY-PARSER
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTERS
app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/send-message', function (req, res) {
    debugger
    const email = req.body.email
    const name = req.body.name
    const message = req.body.message

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: LOGIN,
            pass: PASSWORD
        }
    });

    let mailOptions = {
        from: email, // sender address
        to: 'safronmanbox@gmail.com',
        subject: 'Gmail Smtp NodeJs',
        html: `<div>
                    <h1>You have new message</h1>
                    <p>name: ${name}</p>
                    <p>email: ${email}</p>
                    <p>message: ${message}</p>
               </div> `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('error111: ', error.message);
        }
        console.log('success');
    });
    res.send('email success')
});

// LISTEN APP
app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))





