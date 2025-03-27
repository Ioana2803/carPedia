import { carBrands } from "./car-object.js";
import { NavBarView } from "./nav-view.js";

const navParent = document.querySelector(".nav-container");
const container = document.querySelector(".container");
new NavBarView(navParent);

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
        this.heroSection = this.createHeroSection();
        this.introSection = this.createSection("History", "brand-history", "intro-image");
        this.innovationSection = this.createSection("Innovation & Technology", "brand-innovation", "tech-image", true);
        this.flagshipSection = this.createSection("Flagship Model", "flagship-info", "flagship-image");
        this.legacySection = this.createSection("Legacy & Achievements", "brand-legacy", "legacy-image", true);
        this.gallerySection = this.createGallerySection();
        this.backLink = this.createBackLink();

        this.parent.append(
            this.heroSection,
            this.introSection,
            this.innovationSection,
            this.flagshipSection,
            this.legacySection,
            this.gallerySection,
            this.backLink
        );
    }

    createHeroSection() {
        const section = this.createElement("section", "section");
        this.title = this.createElement("h1", "", { id: "brand-title" });
        this.slogan = this.createElement("p", "", { id: "brand-slogan" });
        section.append(this.title, this.slogan);
        return section;
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
        return this.createElement("a", "back-link", { href: "index.html", innerText: "Back to Main Page" });
    }

    loadCarDetails() {
        const brandName = decodeURIComponent(window.location.hash.substring(1)).replace(/-/g, " ");
        const car = carBrands.find(car => car.name.toLowerCase() === brandName.toLowerCase());

        if (car) {
            this.title.innerText = car.name;
            this.slogan.innerText = car.description;
            this.heroSection.style.backgroundImage = `url(${car.image})`;

            document.getElementById("brand-history").innerText = car.history || "Information not available.";
            document.getElementById("intro-image").src = car.gallery?.[0] || "";

            document.getElementById("brand-innovation").innerText = car.highlights?.join(" | ") || "Information not available.";
            document.getElementById("tech-image").src = car.gallery?.[1] || "";

            document.getElementById("flagship-info").innerText = `Discover ${car.name}'s flagship models.`;
            document.getElementById("flagship-image").src = car.gallery?.[2] || "";

            document.getElementById("brand-legacy").innerText = car.description || "Information not available.";
            document.getElementById("legacy-image").src = car.gallery?.[3] || "";

            this.galleryContainer.innerHTML = "";
            car.gallery?.forEach(imgSrc => {
                const img = this.createElement("img", "", { src: imgSrc, alt: car.name });
                this.galleryContainer.appendChild(img);
            });
        } else {
            this.title.innerText = "Car Not Found";
            this.slogan.innerText = "No details available for this brand.";
        }
    }
}

const carDetailsPage = new CarDetailsView();
window.onload = () => carDetailsPage.loadCarDetails();
