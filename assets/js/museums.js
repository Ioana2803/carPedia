export class MuseumsView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.museums = [];
        this.render();
    }

    async render() {
        this.parentElement.innerHTML = "";
        await this.fetchMuseums();
        this.renderSearchBar();
        this.renderMuseumsList();
    }

    async fetchMuseums() {
        const response = await fetch('./assets/data/museums.json');
        this.museums = await response.json();
    }

    renderSearchBar() {
        const searchDiv = document.createElement("div");
        searchDiv.className = "museum-searchbar";
        searchDiv.innerHTML = `
            <input type="text" placeholder="Search by country or name..." class="museum-search-input">
        `;
        searchDiv.querySelector("input").addEventListener("input", (e) => {
            this.renderMuseumsList(e.target.value);
        });
        this.parentElement.appendChild(searchDiv);
    }

    renderMuseumsList(filter = "") {
        let list = this.museums;
        if (filter) {
            const f = filter.toLowerCase();
            list = list.filter(m =>
                m.name.toLowerCase().includes(f) ||
                m.country.toLowerCase().includes(f)
            );
        }
        // Sort alphabetically
        list.sort((a, b) => a.name.localeCompare(b.name));

        const rowDiv = document.createElement("div");
        rowDiv.className = "row gx-4 gy-4";
        if (list.length === 0) {
            rowDiv.innerHTML = "<p class='no-results'>No museums found.</p>";
        } else {
            list.forEach(museum => {
                rowDiv.appendChild(this.createMuseumCard(museum));
            });
        }
        // Remove old list if present
        const oldList = this.parentElement.querySelector(".row");
        if (oldList) oldList.remove();
        this.parentElement.appendChild(rowDiv);
    }

    createMuseumCard(museum) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-12 col-md-6 d-flex'; // 2 per row on md+, 1 per row on mobile
    
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card h-100 shadow-lg border-start border-4 border-danger flex-fill';
    
        // Image
        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = museum.image_url;
        img.alt = museum.name;
    
        // Card body
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body d-flex flex-column';
    
        // Name
        const name = document.createElement('h5');
        name.className = 'card-title text-primary';
        name.innerText = museum.name;
    
        // Location (with emojis)
        const location = document.createElement('p');
        location.className = 'card-text mb-1';
        location.innerHTML = `<span class="emoji">📍</span>${museum.city}, <span class="emoji">🌍</span>${museum.country}`;
    
        // Description
        const desc = document.createElement('p');
        desc.className = 'card-text mb-2';
        desc.innerText = museum.description;
    
        // Website link
        const link = document.createElement('a');
        link.href = museum.website_url;
        link.target = '_blank';
        link.className = 'link mt-auto';
        link.innerText = 'Official Website';
    
        // Assemble
        cardBody.append(name, location, desc, link);
        cardDiv.append(img, cardBody);
        colDiv.appendChild(cardDiv);
    
        return colDiv;
    }
}
