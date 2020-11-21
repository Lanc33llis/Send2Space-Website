barba.use(barbaCss);

const notFinished = ["/sponsor.html", "/donate.html"]

function loadHeaderFont(){
  var headerFont = document.createElement("link")
  headerFont.type = "text/css"
  headerFont.rel = "stylesheet"
  headerFont.id = "headerFont"
  try{
    if (document.getElementById("headerFont") == null){
      document.body.appendChild(headerFont)
      headerFont.href = "https://fonts.googleapis.com/css?family=Noto+Sans+KR:300"
    }
  }
  catch(e){}
}

var animated = false
let headerSlideDown = [
  {top: '-200px'},
  {top: '-100px'},
  {top: '0px'}
]
var topHeader

function initializeHeader(){
  topHeader = document.getElementById("header")
  animated = false

  window.addEventListener("scroll", async function() {
    if (document.body.scrollTop > header.offsetHeight || document.documentElement.scrollTop > header.offsetHeight){
      topHeader.classList.add("header-load-in")
      if(animated == false){
        topHeader.animate(headerSlideDown, {duration: 500, iteration: 1})
        animated = true
      }
    } else{
      let browser = detectBrowser()
      if (browser == "Chrome"){
        if (document.documentElement.scrollTop == 0){
          topHeader.classList.remove("header-load-in")
          topHeader.animate([{backgroundColor: 'rgba(255, 255, 255, .25)', boxShadow: '0px 10px 6px rgba(0, 0, 0, .15)'}, {backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: '0px 10px 6px rgba(0, 0, 0, 0)'}], {duration: 500, iteration: 1})
          animated = false
        }
      } else if (browser == "MSIE"){
        topHeader.classList.remove("header-load-in")
        animated = false
      } 
    }
  })
}

function detectBrowser() { 
  if((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1 ) {
      return 'Opera';
  } else if(navigator.userAgent.indexOf("Chrome") != -1 ) {
      return 'Chrome';
  } else if(navigator.userAgent.indexOf("Safari") != -1) {
      return 'Safari';
  } else if(navigator.userAgent.indexOf("Firefox") != -1 ){
      return 'Firefox';
  } else if((navigator.userAgent.indexOf("MSIE") != -1 ) || (!!document.documentMode == true )) {
      return 'IE';
  } else {
      return 'Unknown';
  }
} 

barba.init({
  transitions: [
    {
      name: "fade",
      once(){},
      afterOnce(){
        loadHeaderFont()
        initializeHeader()
      },
      beforeEnter({ current, next, trigger }) {
        let bodyLinks = document.querySelectorAll("body");
        let href = next.url.path;

        if (href === "/blog.html") {
          bodyLinks[0].classList.add("blog");
        } else if (notFinished.indexOf(href) != -1){
          barba.go("/wip.html")
        } else {
          bodyLinks[0].classList.remove("blog");
        }

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        loadHeaderFont()
      },
      afterEnter({current, next, trigger}) {
        loadHeaderFont()
        $("#header").load("template.html #default-header", function(){
          let header = document.getElementById("header-section")
          let text = document.querySelectorAll(".nav-text")
          let igPhoto = document.getElementsByClassName("cls-5")[0]
          let href= next.url.path
          if (href === "/join-us.html"){
            try{
              header.classList.add("transparent-header")
              text.forEach(function (e, index){e.classList.add("join-us-nav-text")})
              igPhoto.style.fill = "#fff"
              try{
                console.log("tried adding para to #join-us-para");
                $("#join-us-para").parallax({imageSrc: "/images/groupphoto2.JPG"});
              }
              catch(e){
                console.log(e)
                console.log("failed")
              }
              let paraElement = document.getElementsByClassName("parallax-mirror")
              let paraImage = paraElement[0].children[0]
              paraImage.style.display = "inherit"
            }
            catch(e){
              console.log(e)
            }
          } else{
            try{
              header.classList.remove("transparent-header")
              text.forEach(function (e, index){e.classList.remove("join-us-nav-text")})
              igPhoto.style.fill = "#000"
              let paraElement = document.getElementsByClassName("parallax-mirror")
              let paraImage = paraElement[0].children[0]
              paraImage.style.display = "none"
            }
            catch(e){
              console.log(e)
            }
          }
          initializeHeader()
        })
        $("#footer1").load("template.html #default-footer")
      },
    },
  ],
  views: [
    {
      namespace: "form",
      beforeEnter(data) {
        var valid = document.createElement("script");
        valid.src =
          "//cdnjs.cloudflare.com/ajax/libs/validate.js/0.13.1/validate.min.js";
        document.head.appendChild(valid);
        var domPurify = document.createElement("script");
        domPurify.src =
          "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.1.1/purify.min.js";
        document.head.appendChild(domPurify);
        function submit(event) {
          //this is the form script on contact
          let name = DOMPurify.sanitize(form.elements["name"].value);
          let email = DOMPurify.sanitize(form.elements["email"].value);
          let message = DOMPurify.sanitize(form.elements["message"].value);

          var constraints = {
            name: { length: { minimum: 1 } },
            email: {
              email: true,
            },
            message: { length: { minimum: 1 } },
          };

          document.getElementById("nameerror").innerHTML = "";
          document.getElementById("emailerror").innerHTML = "";
          document.getElementById("messageerror").innerHTML = "";

          let data = { name: name, email: email, message: message };
          let check = validate(data, constraints);
          let passed = undefined;

          if (check != passed) {
            console.log("error somewhere");
            if (check.name != passed) {
              document.getElementById("nameerror").innerHTML =
                "    Error: Not a valid name!";
            }
            if (check.email != passed) {
              document.getElementById("emailerror").innerHTML =
                "    Error: Not a valid email!";
            }
            if (check.message != passed) {
              document.getElementById("messageerror").innerHTML =
                "    Error: Not a valid message!";
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
      },
    },
    {
      namespace: "join-us",
      afterEnter({current, next, trigger}){
        let images = document.querySelectorAll(".join-us-image")
        let obs = new IntersectionObserver(entries => {
          entries.forEach(entry =>{
            if (entry.intersectionRatio >= .1){
              entry.target.classList.add("join-us-in-view")
            } else{
              entry.target.classList.remove("join-us-in-view")
            }
          })
        }, {
          threshold: [0, .3, 1]
        })
        images.forEach(image => {
          obs.observe(image)
        })
      }
    },
  ],
});
