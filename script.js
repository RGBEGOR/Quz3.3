

const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      modeToggle = document.querySelector(".dark-light"),
      searchToggle = document.querySelector(".searchToggle"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

      let getMode = localStorage.getItem("mode");
          if(getMode && getMode === "dark-mode"){
            body.classList.add("dark");
          }


      modeToggle.addEventListener("click" , () =>{
        modeToggle.classList.toggle("active");
        body.classList.toggle("dark");
        
        if(!body.classList.contains("dark")){
            localStorage.setItem("mode" , "light-mode");
        }else{
            localStorage.setItem("mode" , "dark-mode");
        }
      });

        searchToggle.addEventListener("click" , () =>{
        searchToggle.classList.toggle("active");
      });
 
      
sidebarOpen.addEventListener("click" , () =>{
    nav.classList.add("active");
});

body.addEventListener("click" , e =>{
    let clickedElm = e.target;

    if(!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")){
        nav.classList.remove("active");
    }
});






const initSlider = () => {
  const imageList = document.querySelector(".slider-wrapper .image-list");
  const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
  const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
  const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
  

  scrollbarThumb.addEventListener("mousedown", (e) => {
      const startX = e.clientX;
      const thumbPosition = scrollbarThumb.offsetLeft;
      const maxThumbPosition = sliderScrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;
      

      const handleMouseMove = (e) => {
          const deltaX = e.clientX - startX;
          const newThumbPosition = thumbPosition + deltaX;


          const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
          const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;
          
          scrollbarThumb.style.left = `${boundedPosition}px`;
          imageList.scrollLeft = scrollPosition;
      }

      const handleMouseUp = () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
      }


      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
  });


  slideButtons.forEach(button => {
      button.addEventListener("click", () => {
          const direction = button.id === "prev-slide" ? -1 : 1;
          const scrollAmount = imageList.clientWidth * direction;
          imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
      });
  });

  const handleSlideButtons = () => {
      slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "flex";
      slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "flex";
  }


  const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
  }

  imageList.addEventListener("scroll", () => {
      updateScrollThumbPosition();
      handleSlideButtons();
  });
}

window.addEventListener("resize", initSlider);
window.addEventListener("load", initSlider);


document.querySelector(".card-container").addEventListener("click", () => {
    document.querySelector(".card").classList.toggle("is-opened");;
});




var Boxlayout = (function () {
    var wrapper = document.body,
    sgroups = Array.from(document.querySelectorAll(".sgroup")),
    closeButtons = Array.from(document.querySelectorAll(".close-sgroup")),
    expandedClass = "is-expanded",
    hasExpandedClass = "has-expanded-item";
    return { init: init };
    function init() {
        _initEvents();
    }
    function _initEvents() {
        sgroups.forEach(function (element) {
            element.onclick = function () {
                _opensgroup(this);
            };
        });
        closeButtons.forEach(function (element) {
            element.onclick = function (element) {
                element.stopPropagation();
                _closesgroup(this.parentElement);
            };
        });
    }
    function _opensgroup(element) {
        if (!element.classList.contains(expandedClass)) {
            element.classList.add(expandedClass);
            wrapper.classList.add(hasExpandedClass);
        }
    }
    function _closesgroup(element) {
        if (element.classList.contains(expandedClass)) {
            element.classList.remove(expandedClass);
            wrapper.classList.remove(hasExpandedClass);
        }
    }
})();
Boxlayout.init();   













document.addEventListener("DOMContentLoaded", function () {
    var bcards = document.querySelectorAll(".bcard");
    var background = document.querySelector(".background");
    var lastHoveredbcardIndex = 0;
    /* Если нужно запомнить последнее расположение фона */
    /*
    var lastHoveredbcardIndex = localStorage.getItem("lastHoveredbcardIndex") || 0;
    */
    var bcardRect = bcards[lastHoveredbcardIndex].getBoundingClientRect();
    var x = bcards[lastHoveredbcardIndex].offsetLeft + bcardRect.width / 2;
    var y = bcards[lastHoveredbcardIndex].offsetTop + bcardRect.height / 2;
    background.style.width = bcardRect.width + "px";
    background.style.height = bcardRect.height + "px";
    background.style.transform = `translate(${x - bcardRect.width / 2}px, ${
        y - bcardRect.height / 2
    }px)`;
    background.style.opacity = "0";
    bcards.forEach(function (bcard, index) {
        bcard.addEventListener("mouseenter", function (e) {
            var rect = bcard.getBoundingClientRect();
            x = bcard.offsetLeft + rect.width / 2;
            y = bcard.offsetTop + rect.height / 2;        
            background.style.width = rect.width + "px";
            background.style.height = rect.height + "px";
            background.style.transform = `translate(${x - rect.width / 2}px, ${
                y - rect.height / 2
            }px)`;
            background.style.opacity = "1";
            background.style.top = "0%";
            background.style.left = "0%";
            background.style.transformOrigin = "center";
            /* Если нужно запомнить последнее расположение фона */
            /*
            localStorage.setItem("lastHoveredbcardIndex", index); 
            */
        });
        bcard.addEventListener("mouseleave", function (e) {
            background.style.opacity = "0";
            background.style.width = "0px";
            background.style.height = "0px";
        });
    });
});    