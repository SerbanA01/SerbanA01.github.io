window.onscroll = function () { scrollFunction() };

function scrollFunction() {
  var element = document.querySelector(".navbar-logo-left-container.shadow-three ");
  var logo = document.getElementById("logo_erax");
  // .w-nav-brand
  var container_logo = document.querySelector(".w-nav-brand");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    // .navbar-logo-left-container.shadow-three the class of the element that you want to change

    element.style.paddingTop = "0px";
    element.style.paddingBottom = "0px";
    element.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
    logo.style.height = "70px";
    logo.style.width = "100%";
    container_logo.style.backgroundColor = "rgba(0, 77, 122, 0.7)";
    // document.getElementById("navbar").style.padding = "30px 10px";
    // document.getElementById("logo").style.fontSize = "25px";
  } else {
    element.style.paddingTop = "20px";
    element.style.paddingBottom = "20px";
    element.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
    logo.style.height = "";
    logo.style.width = "";
    container_logo.style.backgroundColor = "";
    // document.getElementById("navbar").style.padding = "80px 10px";
    // document.getElementById("logo").style.fontSize = "35px";
  }
}

// slider
$(document).ready(function(){
  $('.team-slider-wrapper').slick({
      arrows: true,           // Enables navigation arrows
      dots: true,             // Enables navigation dots
      infinite: true,         // Enables infinite looping
      speed: 500,             // Speed of transition (in ms)
      prevArrow: '<div class="slick-prev">←</div>',  // Custom left arrow
      nextArrow: '<div class="slick-next">→</div>'   // Custom right arrow
  });
  $('.w-slider-mask').slick({
    arrows: true,        // Enable arrows
    dots: false,         // Disable dots (buttons below)
    infinite: true,      // Enable infinite scrolling
    prevArrow: $('.gallery-slider-left'),  // Assign custom left arrow
    nextArrow: $('.gallery-slider-right'), // Assign custom right arrow
    speed: 500,          // Transition speed
    slidesToShow: 1      // Show 1 slide at a time
});
});




document.addEventListener('DOMContentLoaded', function () {
  const accordionButtons = document.querySelectorAll('.accordion-tab-button');
  const anchorLinks = document.querySelectorAll('a[href^="#"]'); // Select all anchor links with href starting with #
  
  accordionButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      const sectionId = button.getAttribute('data-w-id');
      if (sectionId) {
        toggleAccordion(sectionId);
        toggleInvertClass(button);
      } else {
        console.error('No data-w-id attribute found for this button:', button);
      }
    });
  });
 
  anchorLinks.forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default anchor behavior
      const targetId = anchor.getAttribute('href').substring(1); // Get the target ID without the #
      const buttonTarget = anchor.getAttribute('data-target'); // Get the data-target attribute (corresponding to data-w-id)
      const button = document.querySelector(`[data-w-id="${buttonTarget}"]`); // Find the corresponding button

      if (button) {
        smoothScrollAndToggle(targetId, button); // Scroll and then toggle
      } else {
        console.error('No button found for target:', buttonTarget);
      }
    });
  });
  const hash = window.location.hash.substring(1); // Get the hash without the '#'
  if (hash) {
    const button = document.querySelector(`[href="#${hash}"]`); // Find the corresponding anchor button
    const buttonTarget = button ? button.getAttribute('data-target') : null;
    if (button && buttonTarget) {
      const buttonElement = document.querySelector(`[data-w-id="${buttonTarget}"]`);
      if (buttonElement) {
        smoothScrollAndToggle(hash, buttonElement); // Scroll and toggle accordion
      }
    }
  }
});

function toggleAccordion(sectionId) {
  const sectionElement = document.querySelector(`[data-w-id="${sectionId}"]`);
  if (sectionElement) {
    const accordionPane = sectionElement.nextElementSibling;
    if (accordionPane) {
      if (accordionPane.style.height === "0px" || accordionPane.style.height === "") {
        accordionPane.style.height = `${accordionPane.scrollHeight}px`; // Open the section
        accordionPane.style.overflow = "visible"; // Ensure content is visible
      } else {
        accordionPane.style.height = "0px"; // Close the section
        accordionPane.style.overflow = "hidden"; // Hide content
      }
    }
  } else {
    console.error('No section element found for ID:', sectionId);
  }
}

function smoothScroll(targetId) {
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({
      top: topOffset,
      behavior: 'smooth'
    });
  }
}

function smoothScrollAndToggle(targetId, button) {
  // Perform the smooth scroll first
  smoothScroll(targetId);

  // Use a setTimeout to delay the execution of the accordion toggle and arrow inversion
  setTimeout(function() {
    if (button) {
      const sectionId = button.getAttribute('data-w-id');
      if (sectionId) {
        toggleAccordion(sectionId);
        toggleInvertClass(button);
      }
    }
    else {
      console.error('No button found for this target ID:', targetId);
    }
  }, 800); // Adjust the delay based on scroll time
}

function toggleInvertClass(button) {
  const arrowDiv = button.querySelector('.arrow-div');
  if (arrowDiv) {
    arrowDiv.classList.toggle('invert');
    arrowDiv.classList.toggle('rotate'); // Toggle the rotation class
  }
}
