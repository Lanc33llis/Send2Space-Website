barba.use(barbaCss)

barba.init({
    transitions: [{
        name: "fade",
        beforeEnter({current, next, trigger}){
            let bodyLinks = document.querySelectorAll("body")
            let href = next.url.path

            if(href === "/blog.html" || href === "/contact.html"){
                bodyLinks[0].classList.add("blog")
            }
            else{
                bodyLinks[0].classList.remove("blog")
            }
        },
        afterEnter(){
            $("#header").load("template.html #default-header")
        }
    }],
    views: [{
        namespace: "form",
        beforeEnter(data) {
          var valid = document.createElement('script');
          valid.src = '//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js';
          document.head.appendChild(valid);
          var domPurify = document.createElement('script');
          domPurify.src = 'https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.1.1/purify.min.js';
          document.head.appendChild(domPurify);
            function submit(event) {
              //this is the form script on contact
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
              
        }    
    }]
})