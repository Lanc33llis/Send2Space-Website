function replaceAll(str, find, replace) {
  var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), replace);
}

function sendEmail(body){
  const SENDGRID_API_KEY = "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"
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(SENDGRID_API_KEY);

  raw = body.rawBody
  nameIndex = raw.indexOf("name")
  emailIndex = raw.indexOf("email")
  messageIndex = raw.indexOf("message")

  name = raw.substring(nameIndex + 5, emailIndex - 1)
  email = raw.substring(emailIndex + 6, messageIndex - 1)
  message = raw.substring(messageIndex + 8)

  let name1 = replaceAll(name, "+", " ")
  let email1 = replaceAll(email, "%40", "@")
  let message1 = replaceAll(message, "+", " ")

  name = name1
  email = email1
  message = message1

  console.log(name)
  console.log(email)
  console.log(message)

  const msg = {
    to: email, // Change to your recipient
    from: "scdelance@gmail.com", // Change to your verified sender
    subject: "This is a test!",
    text: message
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = async function (context, req) {
  context.res = {
    body: {
      text: "Hello from the API"
    }
  };
  let data = context.req
  sendEmail(data)
};






