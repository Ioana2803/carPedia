import { carBrands } from "./car-object.js";
import { NavBarView } from "./nav-view.js";

const navParent = document.querySelector(".nav-container");
const container = document.querySelector(".container");
new NavBarView(navParent);

const brandName = decodeURIComponent(window.location.hash.substring(1)).replace(/-/g, " ");
// cont carName = 
const car = carBrands.find(car => 
    car.name.replace(/[-\s]/g, "").toLowerCase() === brandName.replace(/\s/g, "").toLowerCase()
);

console.log("Brand Name:", brandName); // Debug the brand name
console.log("Car Object:", car); // Debug the car object

export class CarDetailsView {
    constructor() {
        this.parent = container;
        this.init();
    }

    createElement(tag, className = "", attributes = {}) {
        const elem = document.createElement(tag);
        if (className) elem.classList.add(className);
        Object.keys(attributes).forEach(attr => elem[attr] = attributes[attr]);
        return elem;
    }

    init() {
        this.topSection = this.createTopSection();

        this.introSection = this.createElement("section", "history-section");
        this.historyContainer = this.createElement("div", "history-container");

        this.historyContent = this.createElement("div", "history-content");
        this.historyTitle = this.createElement("h2", "", { innerText: "History" });
        this.historyText1 = this.createElement("p", "default-text", "");
        this.historyText2 = this.createElement("p", "history-text", "");

        // Read More Button
        this.readMoreBtn = this.createElement("button", "read-more-btn", {innerText: "Read More"});
        this.readMoreBtn.addEventListener("click", () => this.toggleReadMore());

        this.historyContent.append(this.historyTitle, this.historyText1, this.historyText2, this.readMoreBtn);
        this.historyContainer.appendChild(this.historyContent);
        this.introSection.appendChild(this.historyContainer);

        this.innovationSection = this.createSection("Innovation & Technology", "brand-innovation", "tech-image", true);
        this.flagshipSection = this.createSection("Flagship Model", "flagship-info", "flagship-image");
        this.legacySection = this.createSection("Legacy & Achievements", "brand-legacy", "legacy-image", true);
        this.gallerySection = this.createGallerySection();
        this.backLink = this.createBackLink();

        this.parent.append(
            this.topSection,
            this.introSection,
            this.innovationSection,
            this.flagshipSection,
            this.legacySection,
            this.gallerySection,
            this.backLink
        );
    }

    createTopSection() {
        const section = this.createElement("section", "section");
        this.title = this.createElement("h1", "", { id: "brand-title" });
        this.img = this.createElement("img", "", { src: car.topImg, alt: "Cars Showcase" });
        section.append(this.title, this.img);
        return section;
    }

    toggleReadMore() {
        if (this.historyText2.classList.contains("expanded")) {
            this.historyText2.classList.remove("expanded");
            this.readMoreBtn.innerText = "Read More";
        } else {
            this.historyText2.classList.add("expanded");
            this.readMoreBtn.innerText = "Read Less";
        }
    }

    createSection(titleText, textId, imgId, reverse = false) {
        const section = this.createElement("section", "content-section");
        if (reverse) section.classList.add("reverse");

        const textContainer = this.createElement("div");
        const title = this.createElement("h2", "", { innerText: titleText });
        const text = this.createElement("p", "", { id: textId });
        textContainer.append(title, text);

        const image = this.createElement("img", "", { id: imgId, alt: titleText });
        section.append(reverse ? textContainer : image, reverse ? image : textContainer);
        return section;
    }

    createGallerySection() {
        const section = this.createElement("section", "", { id: "gallery" });
        const galleryTitle = this.createElement("h2", "", { innerText: "Gallery" });
        this.galleryContainer = this.createElement("div", "", { id: "gallery-container" });
        section.append(galleryTitle, this.galleryContainer);
        return section;
    }

    createBackLink() {
        return this.createElement("a", "back-link", { href: "brands.html", innerText: "Back to Brands Page" });
    }

    loadCarDetails() {
        if (car) {
            this.title.innerText = car.name;
            // this.topSection.style.backgroundImage = `url(${car.topImg})`;

            document.querySelector(".default-text").innerText = car.history1 || "Information not available.";
            document.querySelector(".history-text").innerText = car.history2?.join(" ") || "Information not available.";

            document.getElementById("brand-innovation").innerText = car.highlights?.join(" | ") || "Information not available.";
            document.getElementById("tech-image").src = car.gallery?.[0] || "";

            document.getElementById("flagship-info").innerText = car.flagship?.join(" ") || "Information not available.";
            document.getElementById("flagship-image").src = car.gallery?.[1] || "";

            document.getElementById("brand-legacy").innerText = car.legacy?.join(" ") || "Information not available.";
            document.getElementById("legacy-image").src = car.gallery?.[2] || "";

            this.galleryContainer.innerHTML = "";
            car.gallery?.forEach(imgSrc => {
                const img = this.createElement("img", "", { src: imgSrc, alt: car.name });
                this.galleryContainer.appendChild(img);
            });
        } 
        else {
            this.title.innerText = "Car Not Found";
            this.slogan.innerText = "No details available for this brand.";
        }
    }
}

const carDetailsPage = new CarDetailsView();
window.onload = () => carDetailsPage.loadCarDetails();
