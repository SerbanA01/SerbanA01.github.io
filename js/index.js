window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var element = document.querySelector(".navbar-logo-left-container.shadow-three ");
    var logo = document.getElementById("logo_erax");
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        // .navbar-logo-left-container.shadow-three the class of the element that you want to change

        element.style.paddingTop = "0px";
        element.style.paddingBottom = "0px";
        element.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        logo.style.height = "10vh";
        logo.style.width = "100%";
        // document.getElementById("navbar").style.padding = "30px 10px";
        // document.getElementById("logo").style.fontSize = "25px";
    } else {
        element.style.paddingTop = "20px";
        element.style.paddingBottom = "20px";
        element.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
        logo.style.height = "";
        logo.style.width = "";
        // document.getElementById("navbar").style.padding = "80px 10px";
        // document.getElementById("logo").style.fontSize = "35px";
    }
}






// Function to reset animations on all slides
function resetAnimations() {
    const slides = document.querySelectorAll('.w-slide');
    slides.forEach((slide) => {
        slide.classList.remove('animate-slide');
    });
}

// Function to trigger animation on the active slide
function triggerAnimationOnSlide(slide) {
    if (!slide) return; // Ensure the slide exists before applying the animation
    resetAnimations(); // Remove animations from all slides
    slide.classList.add('animate-slide'); // Add animation class to the active slide
}

// Function to get the active slide by finding the active dot
function getActiveSlide() {
    const activeDot = document.querySelector('.w-slider-dot.w-active'); // Find the active dot
    if (activeDot) {
        const dots = Array.from(document.querySelectorAll('.w-slider-dot')); // Get all dots
        const activeIndex = dots.indexOf(activeDot); // Find the index of the active dot
        const slides = document.querySelectorAll('.w-slide'); // Get all slides
        return slides[activeIndex] || null; // Return the slide at the active index
    }
    return null;
}

// Function to observe changes in the slider dots
function observeSliderDots() {
    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (mutation.target.classList.contains('w-active')) {

                    const activeSlide = getActiveSlide(); // Get the active slide
                    if (activeSlide) {
                        triggerAnimationOnSlide(activeSlide);
                    }
                }
            }
        }
    });

    // Observe all slider dots for changes in their 'class' attribute
    const dots = document.querySelectorAll('.w-slider-dot');
    dots.forEach((dot) => observer.observe(dot, { attributes: true }));
}

// Wait until Webflow finishes initializing
document.addEventListener('DOMContentLoaded', function () {


    // Delay execution to ensure Webflow slider is initialized
    setTimeout(function () {
        const activeSlide = getActiveSlide(); // Get the active slide based on the active dot
        if (activeSlide) {

            triggerAnimationOnSlide(activeSlide);
        }

        // Start observing for changes in the slider dots
        observeSliderDots();
    }, 500); // 500ms delay to give time for slider initialization



    
});


