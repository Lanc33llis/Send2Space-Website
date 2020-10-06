// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const SENDGRID_API_KEY='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'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)

const msg = {
    to: 'scdelance@gmail.com', // Change to your recipient
    from: 'scdelance@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })