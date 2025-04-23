import { carBrands } from "./car-object.js";

export class CarBrandsView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.render();
    }

    createElement(tag, className = "", attributes = {}) {
        const element = document.createElement(tag);
        if (className) {
            className.split(" ").forEach(cls => element.classList.add(cls));
        }
        Object.keys(attributes).forEach(attr => element[attr] = attributes[attr]);
        return element;
    }

    render() {
        const rowDiv = this.createElement('div', 'row gt-4'); // Add multiple Bootstrap classes

        carBrands.forEach((brand) => {
            const colDiv = this.createElement('div', 'col col-12 col-sm-6 col-md-3'); // Responsive Bootstrap column classes

            const cardDiv = this.createElement('div', 'cards'); // Card with full height

            // Apply background image
            cardDiv.style.backgroundImage = `url(${brand.cardImage})`;

            // Card content
            const cardBody = this.createElement('div', 'card-body');
            const cardTitle = this.createElement('h5', 'card-title', { innerText: brand.name });
            const cardText = this.createElement('p', 'card-text', { innerText: brand.description });

            cardBody.append(cardTitle, cardText);
            cardDiv.append(cardBody);
            colDiv.append(cardDiv);
            rowDiv.append(colDiv);

            // Click event
            cardDiv.addEventListener("click", () => {
                window.location.hash = brand.name.replace(/\s+/g, '-');
                window.location.href = "car-details.html" + window.location.hash;
            });
        });

        this.parentElement.append(rowDiv);
    }
}