import { carBrands } from "./car-object.js";
import { NavBarView } from "./nav-view.js";

const navParent = document.querySelector('.nav-container');
new NavBarView(navParent);

class CarDetails {
    constructor() {
        this.container = document.createElement("div");
        this.container.classList.add("container");

        this.title = document.createElement("h1");
        this.title.id = "brand-title";

        this.image = document.createElement("img");
        this.image.id = "brand-image";
        this.image.alt = "Car Image";

        this.description = document.createElement("p");
        this.description.id = "brand-description";

        this.backLink = document.createElement("a");
        this.backLink.href = "index.html";
        this.backLink.innerText = "Back to Main Page";

        // Append elements to the container
        this.container.appendChild(this.title);
        this.container.appendChild(this.image);
        this.container.appendChild(this.description);
        this.container.appendChild(this.backLink);

        // Append container to body
        document.body.appendChild(this.container);
    }

    loadCarDetails() {
        const brandName = decodeURIComponent(window.location.hash.substring(1)).replace(/-/g, ' ');
        const car = carBrands.find(car => car.name.toLowerCase() === brandName.toLowerCase());

        if (car) {
            this.title.innerText = car.name;
            this.image.src = car.image;
            this.description.innerText = car.text;
        } else {
            this.title.innerText = "Car Not Found";
            this.description.innerText = "No details available for this brand.";
        }
    }
}

// Initialize CarDetails
const carDetailsPage = new CarDetails();
window.onload = () => carDetailsPage.loadCarDetails();
