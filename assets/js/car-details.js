import { carBrands } from "./car-object.js";
import { NavBarView } from "./nav-view.js";
const navParent = document.querySelector('.nav-container');
new NavBarView(navParent);

// Function to load brand details dynamically
function loadCarDetails() {
    const brandName = decodeURIComponent(window.location.hash.substring(1)).replace(/-/g, ' '); // Convert dashes back to spaces
    const car = carBrands.find(car => car.name.toLowerCase() === brandName.toLowerCase());

    if (car) {
        document.getElementById("brand-title").innerText = car.name;
        document.getElementById("brand-image").src = car.image;
        document.getElementById("brand-description").innerText = car.text;
    } else {
        document.getElementById("brand-title").innerText = "Car Not Found";
        document.getElementById("brand-description").innerText = "No details available for this brand.";
    }
}

// Load data when the page is loaded
window.onload = loadCarDetails;
