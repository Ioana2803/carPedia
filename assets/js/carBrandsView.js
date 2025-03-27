import { carBrands } from "./car-object.js";

export class CarBrandsView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.render();
    }

    createElement(tag, className = "", attributes = {}) {
        const element = document.createElement(tag);
        if (className) element.classList.add(className);
        Object.keys(attributes).forEach(attr => element[attr] = attributes[attr]);
        return element;
    }

    render() {
        // Grouping car brand cards into rows
        const rows = this.chunkArray(carBrands, 4); // 4 items per row

        rows.forEach(rowData => {
            const rowDiv = this.createElement('div', 'row');
            
            rowData.forEach((brand) => {
                const colDiv = this.createElement('div', 'col');
                const cardDiv = this.createElement('div', 'card');
                
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

                // Event Listener: Navigate to the details page
                cardDiv.addEventListener("click", () => {
                    window.location.hash = brand.name.replace(/\s+/g, '-'); // Convert spaces to dashes for URL safety
                    window.location.href = "car-details.html" + window.location.hash; // Redirect to details page
                });
            });

            this.parentElement.append(rowDiv);
        });
    }

    chunkArray(array, chunkSize) {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    }
}