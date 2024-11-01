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
