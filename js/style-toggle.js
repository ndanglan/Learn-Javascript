const styleToggler = document.querySelector(".style-toggler");

styleToggler.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open");
})

// hide style-swither on scroll
window.addEventListener("scroll",()=>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

// theme color
const alternateStyle = document.querySelectorAll(".alternate-style");

function setActiveStyle(color){
    localStorage.setItem("color",color);
    changeColor();
}

function changeColor(){
        alternateStyle.forEach((style)=>{
        if(localStorage.getItem("color") === style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true");
        }
    })
}

// checking if"color" key exists
if(!localStorage.getItem("color")!==null){
    changeColor();
}


document.addEventListener("click",(event)=>{
    if(!event.target.classList.contains("style-toggler") && !event.target.classList.contains("fa-spin")  && document.querySelector(".style-switcher").classList.contains("open") ){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

// theme light-dark mode
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click",()=>{
    
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
    }else{
        localStorage.setItem("theme","light");
    }
    updateIcon();
})

function themeMode(){
    if(!localStorage.getItem("theme")!==null){
        if(localStorage.getItem("theme") === "light"){
            document.body.classList.remove("dark");
        }else{
            document.body.classList.add("dark");
        }
    }
    updateIcon();
}

themeMode();

function updateIcon(){
    if(document.body.classList.contains("dark")){
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }else{
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}
// window.addEventListener("load",()=>{
//     if(document.body.classList.contains("dark")){
//         dayNight.querySelector("i").classList.add("fa-sun");
//     }else{
//         dayNight.querySelector("i").classList.add("fa-moon");
//     }
// })


// WHEN PAGE IS reloading the website go back to darkmode and skin-color changes to defaults