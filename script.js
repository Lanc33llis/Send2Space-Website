barba.use(barbaCss)

barba.init({
    transitions: [{
        name: "fade",
        afterEnter(){
            $("#header").load("template.html #default-header")
        }
    }]
})