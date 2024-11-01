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

    // 3 rendering

    // counting for the years
    // Select the counter element
    const counterElement = document.querySelector('.counter');

    // Create the counter function
    function startCounting() {
        let count = 0;
        const targetCount = 10;
        const interval = 1000; // Time in milliseconds between counts
        const stepTime = Math.abs(Math.floor(interval / targetCount));

        const counterInterval = setInterval(() => {
            counterElement.textContent = count;
            if (count >= targetCount) {
                clearInterval(counterInterval);
            }
            count++;
        }, stepTime);
    }

    // Create an IntersectionObserver to trigger the counter when it comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(); // Start counting when the element is in view
                observer.unobserve(counterElement); // Stop observing once counting starts
            }
        });
    });

    // Observe the counter element
    observer.observe(counterElement);

});


const container = document.getElementById('model-container');

// Create the scene
const scene = new THREE.Scene();

// Create the camera with a 1:1 aspect ratio
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio is 1 for 400px by 400px
camera.position.set(0, 1, 2);

// Create the renderer and set it to 400px x 400px
const renderer = new THREE.WebGLRenderer({ alpha: false }); // Remove 'alpha: true' so the background is not transparent
renderer.setSize(400, 400); // Fixed 400x400 size
renderer.setClearColor(0xffffff, 1); // 0xffffff is white, 1 is full opacity
container.appendChild(renderer.domElement); // Attach the renderer to the div

// Add OrbitControls for moving the render
const controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; // Smooths the camera motion
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false; // Prevents panning from moving the camera vertically
controls.minDistance = 10;  // Minimum zoom distance
controls.maxDistance = 150; // Maximum zoom distance
controls.maxPolarAngle = Math.PI / 2; // Prevents the camera from moving below the ground

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Load the .glb file from the local server
const loader = new THREE.GLTFLoader();
loader.load(
    'http://localhost:8000/modele_3d/test_model.glb', // Update the URL to point to the local server
    function (gltf) {
        scene.add(gltf.scene);
        animate();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error occurred while loading the GLB file', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // Update the controls
    renderer.render(scene, camera);
}

// Handle resizing
window.addEventListener('resize', () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
});
