function submit(event) {
  let name = form.elements["name"].value;
  let email = form.elements["email"].value;
  let message = form.elements["message"].value;

  console.log(name);
  console.log(email);
  console.log(message);

  let data = { name: name, email: email, message: message }
  $.post("https://s2scontactapp.azurewebsites.net/send", data)

  event.preventDefault();
}

const form = document.getElementById("contact");
form.addEventListener("submit", submit);
