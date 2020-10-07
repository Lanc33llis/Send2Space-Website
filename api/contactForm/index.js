function replaceAll(str, find, replace) {
  var escapedFind=find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return str.replace(new RegExp(escapedFind, 'g'), replace);
}

function percentDecode(str){
  str = replaceAll(str, "+", " ")
  str = replaceAll(str, "%21", "!")
  str = replaceAll(str, "%22", "\"")
  str = replaceAll(str, "%23", "#")
  str = replaceAll(str, "%24", "$")
  str = replaceAll(str, "%25", "%")
  str = replaceAll(str, "%26", "&")
  str = replaceAll(str, "%27", "'")
  str = replaceAll(str, "%28", "(")
  str = replaceAll(str, "%29", ")")
  str = replaceAll(str, "%2A", "*")
  str = replaceAll(str, "%2B", "+")
  str = replaceAll(str, "%2C", ",")
  str = replaceAll(str, "%2F", "/")
  str = replaceAll(str, "%3A", ":")
  str = replaceAll(str, "%3B", ";")
  str = replaceAll(str, "%3D", "=")
  str = replaceAll(str, "%3F", "?")
  str = replaceAll(str, "%40", "@")
  str = replaceAll(str, "%2D", "`")
  str = replaceAll(str, "%2E", ".")
  str = replaceAll(str, "%3C", "<")
  str = replaceAll(str, "%3E", ">")
  str = replaceAll(str, "%5E", "^")
  str = replaceAll(str, "%60", "`")
  str = replaceAll(str, "%7B", "{")
  str = replaceAll(str, "%7C", "|")
  str = replaceAll(str, "%7D", "}")
  str = replaceAll(str, "%7E", "~")
  str = replaceAll(str, "%7B", "{")
  str = replaceAll(str, "%5B", "[")
  str = replaceAll(str, "%5D", "]")
  str = replaceAll(str, "%2C", "\\")
  return str
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

  name1 = percentDecode(name)
  email1 = percentDecode(email)
  message1 = percentDecode(message)


  name = name1
  email = email1
  message = message1

  console.log(name)
  console.log(email)
  console.log(message)

  const msg = {
    to: "scdelance@gmail.com", // Change to your recipient
    from: "scdelance@gmail.com", // Change to your verified sender
    replyTo: email,
    subject: "lee-send2space.ml contact form was filled out from " + name,
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






