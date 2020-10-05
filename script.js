barba.use(barbaCss)

barba.init({
    transitions: [{
        name: "fade",
        beforeEnter({current, next, trigger}){
            const bodyLinks = document.querySelectorAll("body")
            const href = next.url.path

            if(href != "/blog.html"){
                bodyLinks[0].classList.remove("blog")
            }
            else{
                bodyLinks[0].classList.add("blog")
            }
        },
        afterEnter(){
            $("#header").load("template.html #default-header")
        }
    }]
})