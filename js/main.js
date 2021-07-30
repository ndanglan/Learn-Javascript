// navigation menu

(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");

    hamburgerBtn.addEventListener("click",showNavMenu);
    closeNavBtn.addEventListener("click",hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }

    function hideNavMenu(){
        navMenu.classList.remove("open");
        bodyScrollingToggle();
    }


    // attach and event handler to document
    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains("link-item")){
            // make sure event.target has hashtag
            if(event.target.hash !== ""){
                event.preventDefault();
                const hash = event.target.hash;
                // deactive existing active section
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");

                // active new section
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");

                //  deactive existing active navigation menu link-item
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");

                // if click""link-item"is contained within the navigation menu
                if(navMenu.classList.contains("open")){
                    // active new navigation menu link-item
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");

                    hideNavMenu()
                }else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hash === item.hash){
                            // activate new navigation menu link-item 
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                }
                //add hash to URL
                window.location.hash = hash;
            }
        }
    })
})();


//-----------About Section tabs-------------------

(()=>{
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click",(event)=>{

        // if event.target contains"tab-item"  class
        // and not contains active class
              if(event.target.classList.contains("tab-item")&&
         !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            // deactive existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow","active")
            // active new 'tab-item'
            event.target.classList.add("active","outer-shadow");

            // deactive existing active 'tab-content' 
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
// active new active 'tab-content' 
             aboutSection.querySelector(target).classList.add("active");
            
        }
    })
})();


/*---------------------------------
portfolio filter and popup 
------------------*/
function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

(()=>{
    const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector(".portfoli-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    // filter portfolio items
    filterContainer.addEventListener("click",(event)=>{
       if(event.target.classList.contains("filter-item") &&
        !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");

            // deactive filter-item 
            filterContainer.querySelector(".active").classList.remove("active","outer-shadow");

            // active target
            event.target.classList.add("active","outer-shadow");
            
            portfolioItems.forEach((item)=>{
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.add("hide");
                    item.classList.remove("show");
                }
            })
        }
    })

    //processing portfolioItems
    portfolioItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").
            parentElement;
            
            //get the portfolio index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);

            // get data-screenshots
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
           
            // convert screenshots into array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }

            slideIndex = 0;

            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", ()=>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
         bodyScrollingToggle();
    }

    function popupSlideShow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");

        // active loader until the popupImg loaded
        popup.querySelector(".pp-loader").classList.add("active");

        // trên src of pp-img
        popupImg.src = imgSrc;

        // deactive loader after the popupImg loaded
        popupImg.onload = ()=>{
            popup.querySelector(".pp-loader").classList.remove("active");
        }

        // change slideindex
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click",()=>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideShow();
        
    })

    // prev slide

    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideShow();
        
    })

    // click to project detail btn
    projectDetailsBtn.addEventListener("click",()=>{
        popupDetailsToggle();
    })

    function popupDetails(){    
        //get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;

        //get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;

        //get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");

        // set project details
        popup.querySelector(".pp-project-details").innerHTML = details;

         // set project title
        popup.querySelector(".pp-title h2").innerHTML = title;

        //get the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
        // console.log(category);
    }

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight =  0 +"px";
        }else{
            // console.log("hello");
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
})();


// testimonial slider

(()=>{
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");

    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    // set width of all slide 
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })

    // set width of slidecontainer
     sliderContainer.style.width = slideWidth * slides.length +"px";

    nextBtn.addEventListener("click",()=>{
        if(slideIndex === slides.length-1){
            slideIndex=0;
        }else{
            slideIndex++;
        }
        slider();
    })

    prevBtn.addEventListener("click",()=>{
        if(slideIndex === 0){
            slideIndex= slides.length-1;
        }else{
            slideIndex--;
        }
       slider();
    })
   
    function slider(){
        // deactive existing slide
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");

        // active new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex)+"px";
    }

    slider();
    // console.log(sliderContainer);
})();

// hide all section  except active

(()=>{
    const sections = document.querySelectorAll(".section");
    
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })

})();