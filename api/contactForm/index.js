module.exports = async function (context, req) {
  context.res = {
    body: {
      text: "Hello from the API"
    }
  };
};

  // const SENDGRID_API_KEY = "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"
  // const sgMail = require("@sendgrid/mail");
  // sgMail.setApiKey(SENDGRID_API_KEY);
  // const msg = {
  //   to: "scdelance@gmail.com", // Change to your recipient
  //   from: "scdelance@gmail.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun222",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });


