function submit(event) {
  let name = form.elements["name"].value;
  let email = form.elements["email"].value;
  let message = form.elements["message"].value;

  console.log(name);
  console.log(email);
  console.log(message);

  // let data = { name: name, email: email, message: message }(
  //   (async function () {
  //     $.ajax({
  //       url: "/api/message",
  //       type: "POST",
  //       data: data,
  //       async: true, 
  //       success: function (response, textStatus, jqXHR) {
  //         console.log(response);
  //       },
  //       error: function (jqXHR, textStatus, errorThrown) {
  //         console.log(jqXHR);
  //         console.log(textStatus);
  //         console.log(errorThrown);
  //       },
  //     });
  //     document.querySelector("#test").textContent = "Working!";
  //   })()
  // );

  event.preventDefault();
}

const form = document.getElementById("contact");
form.addEventListener("submit", submit);
