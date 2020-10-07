module.exports = async function (context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully. 11"
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

const SENDGRID_API_KEY = "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"
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
  to: "scdelance@gmail.com", // Change to your recipient
  from: "scdelance@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun222",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });