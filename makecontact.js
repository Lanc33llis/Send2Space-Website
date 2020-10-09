function submit(event) {
  let name = DOMPurify.sanitize(form.elements["name"].value);
  let email =  DOMPurify.sanitize(form.elements["email"].value);
  let message =  DOMPurify.sanitize(form.elements["message"].value);

  var constraints = {
    name: {length: {minimum: 1}},
    email: {
      email: true,
    },
    message: {length: {minimum: 1}}
  };

  document.getElementById("nameerror").innerHTML = ""
  document.getElementById("emailerror").innerHTML = ""
  document.getElementById("messageerror").innerHTML = ""
  
  let data = { name: name, email: email, message: message };
  let check = validate(data, constraints)
  let passed = undefined
  
  if(check != passed){
    console.log("error somewhere")
      if (check.name != passed){
        document.getElementById("nameerror").innerHTML = "    Error: Not a valid name!"
      }
      if (check.email != passed){
        document.getElementById("emailerror").innerHTML = "    Error: Not a valid email!"
      }
      if (check.message != passed){
        document.getElementById("messageerror").innerHTML = "    Error: Not a valid message!"
      }
    event.preventDefault();
    return;
  }

  $.post("https://s2scontactapp.azurewebsites.net/send", data);

  let button = document.getElementById("sendform");
  button.classList.remove("send");
  button.classList.add("sent");
  button.value = "sent!";

  event.preventDefault();
}

const form = document.getElementById("contact");
form.addEventListener("submit", submit);
