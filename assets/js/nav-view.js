import { carBrands } from '../data/car-object.js';
import { SearchModel } from './nav-model.js';

export class NavBarView {
    constructor(parentDOMElement) {
        this.parent = parentDOMElement;
        this.searchModel = new SearchModel();
        this.currentFilteredBrands = [];
        this.totalRot = 0;
        this.selectedIndex = -1;
        this.isNavigating = false;  // Flag to track if the user is navigating with arrows
        this.init();
    }

    createElement(tag, classNames = "", attributes = {}) {
        const elem = document.createElement(tag);

        if (Array.isArray(classNames)) {
            elem.classList.add(...classNames);
        } else if (classNames) {
            elem.classList.add(classNames);
        }

        Object.keys(attributes).forEach(attr => elem[attr] = attributes[attr]);
        return elem;
    }

    init() {
        // Create header and nav
        this.header = this.createElement("header");
        this.nav = this.createElement("nav");
        this.header.append(this.nav);
        this.parent.append(this.header);

        // Logo Section
        this.logo = this.createElement("div", "logo");
        this.logoImg = this.createElement("img", "", { src: "./assets/imgs/car-logo.png", alt: "AutoPedia Logo" });
        this.logoSpan = this.createElement("span", "logo-text", { innerText: "AutoPedia" });
        this.logo.append(this.logoImg, this.logoSpan);
        this.nav.append(this.logo);

        // Navigation Container
        this.navContainer = this.createElement("div", "menu-container");
        this.nav.append(this.navContainer);

        // Search Bar
        this.searchDiv = this.createElement("div", "search");
        this.searchInput = this.createElement("input", "", { type: "text", placeholder: "Search..." });
        this.searchDiv.append(this.searchInput);
        this.navContainer.append(this.searchDiv);


        // Add search event listeners
        this.searchInput.addEventListener("input", this.handleSearch.bind(this)); // For search input
        this.searchInput.addEventListener("keypress", this.handleEnterSearch.bind(this)); // For Enter key press
        this.searchInput.addEventListener("keydown", this.handleArrowNavigation.bind(this)); // For arrow key navigation


        // Menu List
        this.navMenu = this.createElement("ul", "menu");
        this.navContainer.append(this.navMenu);

        // Add Menu Items
        this.addMenuItem("Home", "index.html");

        // Dynamically select the first three brands from carBrands
        const brands = carBrands.map(brand => ({ name: brand.name, hash: brand.hash }));
        this.addDropdownMenu("Brands", "brands.html", brands);
        this.addMenuItem("News", "news.html");

        // Menu Button
        this.menuButton = this.createElement("button", "menu-btn", { onclick: () => this.toggleMenu() });
        this.menuButtonImg = this.createElement("img", "", { src: "./assets/imgs/menu2-white.png", alt: "Menu" });
        this.menuButton.append(this.menuButtonImg);
        this.navContainer.append(this.menuButton);

        // Mobile Dropdown Menu
        this.mobileDropdown = this.createElement("div", "menu-dropdown");

        // Copy the desktop menu items into mobile
        const desktopMenuItems = this.navMenu.querySelectorAll("li > a");
        desktopMenuItems.forEach(item => {
            const linkClone = this.createElement("a", "clone", { 
                href: item.getAttribute("href"), 
                innerText: item.innerText 
            });
            this.mobileDropdown.append(linkClone);
        });

        ["Community", "Museums", "About CarPedia"].forEach(text => {
            const link = this.createElement("a", "burger", { href: `${text.replace(/[-\s]/g, "").toLowerCase()}.html`, innerText: text });
            this.mobileDropdown.append(link);
        });

        this.navContainer.append(this.mobileDropdown);
    }

    handleSearch() {
        this.searchModel.updateQuery(this.searchInput.value);
        this.updateSearchResults();
    }

    handleEnterSearch(event) {
        if (event.key === "Enter") {
            // If the user is navigating with the arrow keys, prevent default behavior
            if (this.isNavigating) {
                this.isNavigating = false;  // Reset the flag after enter is pressed
                return;  // Do nothing (prevent Enter search behavior)
            }
    
            // If there's no navigation, proceed with regular Enter key behavior
            const firstBrandHash = this.searchModel.getFirstBrandHash();
            if (firstBrandHash) {
                window.location.href = `car-details.html#${firstBrandHash}`;
            } else {
                alert("No matching brand found.");
            }
        }
    }
    
    
    handleArrowNavigation(e) {
        const results = this.searchDiv.querySelectorAll(".search-result-item");
    
        if (e.key === "ArrowDown") {
            e.preventDefault();
            this.selectedIndex = Math.min(this.selectedIndex + 1, results.length - 1);
            this.isNavigating = true;  // Indicate that the user is navigating
        } 
        else if (e.key === "ArrowUp") {
            e.preventDefault();
            this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
            this.isNavigating = true;  // Indicate that the user is navigating
        } 
        else if (e.key === "Enter" && this.selectedIndex >= 0) {
            const selectedBrand = this.currentFilteredBrands[this.selectedIndex];
            const brandHash = selectedBrand.name.replace(/\s+/g, '-');
            window.location.href = `car-details.html#${brandHash}`;
        }
    
        results.forEach((result, idx) => {
            result.classList.toggle("selected", idx === this.selectedIndex);
        });
    }
    

    updateSearchResults() {
        console.log("Updating search results...");  // Check if this is being triggered
        this.currentFilteredBrands = this.searchModel.getFilteredBrands();
        const filteredBrands = this.currentFilteredBrands;
     
        const existingResults = this.searchDiv.querySelector(".search-results");
        if (existingResults) {
            existingResults.remove();  // Ensure previous results are removed
        }
     
        const searchResults = this.createElement("div", "search-results");
     
        if (filteredBrands.length > 0) {
            searchResults.classList.add("active");
        } else {
            searchResults.classList.remove("active");
        }
     
        searchResults.innerHTML = "";  // Make sure to clear the previous content
     
        filteredBrands.forEach((brand, index) => {
            const brandElement = this.createElement("div", "search-result-item", {
                tabindex: "0"
            });
            brandElement.textContent = brand.name;
     
            brandElement.addEventListener("click", () => {
                const brandNameFormatted = brand.name.replace(/\s+/g, '-');
                window.location.href = `car-details.html#${brandNameFormatted}`;
                // window.location.reload();
            });
     
            searchResults.append(brandElement);
        });
     
        if (filteredBrands.length === 0) {
            searchResults.innerHTML = "<p>No results found.</p>";
        }
     
        this.searchDiv.append(searchResults);  // Append the updated search results
    }

    addMenuItem(text, link) {
        const li = this.createElement("li");
        const a = this.createElement("a", "", { href: link, innerText: text });
        li.append(a);
        this.navMenu.append(li);
    }

    addDropdownMenu(text, link, subItems) {
        const li = this.createElement("li", "dropdown-container");
        const a = this.createElement("a", "", { href: link, innerText: text });

        const dropdown = this.createElement("div", "dropdown");

        const columns = 3;
        const columnSize = Math.ceil(subItems.length / columns);

        for (let i = 0; i < columns; i++) {
            const column = this.createElement("div", "dropdown-column");

            subItems.slice(i * columnSize, (i + 1) * columnSize).forEach(item => {
                const subLink = this.createElement("a", "", {
                    href: `car-details.html?brand=${item.hash}`,
                    innerText: item.name
                });

                subLink.addEventListener("click", () => {
                    const newName = item.name.replace(/\s+/g, '-');
                    window.location.href = `car-details.html#${newName}`;
                    // window.location.reload();
                });

                column.append(subLink);
            });

            dropdown.append(column);
        }

        li.append(a, dropdown);
        this.navMenu.append(li);
    }

    toggleMenu() {
        this.mobileDropdown.classList.toggle("active");
        this.rotateRight(this.menuButton, 90);
    }

    rotateRight(ele, deg){
        this.totalRot += deg;
        deg = this.totalRot % 180;        
        ele.style.transform = "rotate("+ deg +"deg)";
    }
}

window.addEventListener('hashchange', () => {
    location.reload();
});