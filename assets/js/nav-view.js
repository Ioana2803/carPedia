import { carBrands } from "./car-object.js";

export class NavBarView {
    constructor(parentDOMElement) {
        this.parent = parentDOMElement;
        this.totalRot = 0;
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
        this.logoImg = this.createElement("img", "", { src: "/assets/imgs/car-logo.png", alt: "AutoPedia Logo" });
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

        // Menu List
        this.navMenu = this.createElement("ul", "menu");
        this.navContainer.append(this.navMenu);

        // Add Menu Items
        this.addMenuItem("Home", "index.html");

        // Dynamically select the first three brands from carBrands
        const brands = carBrands.map(brand => ({ name: brand.name, hash: brand.hash }));
        this.addDropdownMenu("Brands", "brands.html", brands);
        this.addMenuItem("News", "#");

        // Menu Button
        this.menuButton = this.createElement("button", "menu-btn", { onclick: () => this.toggleMenu() });
        this.menuButtonImg = this.createElement("img", "", { src: "/assets/imgs/menu2-white.png", alt: "Menu" });
        this.menuButton.append(this.menuButtonImg);
        this.navContainer.append(this.menuButton);

        // Mobile Dropdown Menu
        this.mobileDropdown = this.createElement("div", "menu-dropdown");

        ["Community", "About", "Account"].forEach(text => {
            const link = this.createElement("a", "", { href: "#", innerText: text });
            this.mobileDropdown.append(link);
        });

        this.navContainer.append(this.mobileDropdown);
    }

    addMenuItem(text, link) {
        const li = this.createElement("li");
        const a = this.createElement("a", "", { href: link, innerText: text });
        li.append(a);
        this.navMenu.append(li);
    }

    addDropdownMenu(text, link, subItems) {
        const li = this.createElement("li", "dropdown-container");
    
        // Main menu item (clicking this should go to brands.html)
        const a = this.createElement("a", "", { href: link, innerText: text });
    
        // Create dropdown menu
        const dropdown = this.createElement("div", "dropdown");
    
        const columns = 3; // Number of columns in the dropdown
        const columnSize = Math.ceil(subItems.length / columns); // Calculate size of each column
    
        for (let i = 0; i < columns; i++) {
            const column = this.createElement("div", "dropdown-column");
    
            subItems.slice(i * columnSize, (i + 1) * columnSize).forEach(item => {
                const subLink = this.createElement("a", "", { 
                    href: `car-details.html?brand=${item.hash}`, 
                    innerText: item.name 
                });
    
                subLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    window.location.hash = item.name.replace(/\s+/g, '-'); // Convert spaces to dashes for URL safety
                    window.location.href = "car-details.html" + window.location.hash; // Redirect to details page
                    window.location.reload(); // Reload the page to reflect the new URL
                });

                column.append(subLink);
            });
    
            dropdown.append(column);
        }
    
        // Append elements
        li.append(a, dropdown);
        this.navMenu.append(li);
    }
    

    // addDropdownMenu(text, link, subItems) {
    //     const li = this.createElement("li", "dropdown-container");
    
    //     // Main menu item (clicking this should go to brands.html)
    //     const a = this.createElement("a", "", { href: link, innerText: text });
    
    //     // Create dropdown menu
    //     const dropdown = this.createElement("div", "dropdown");
    
    //     const columns = 3; // Number of columns in the dropdown
    //     const columnSize = Math.ceil(subItems.length / columns); // Calculate size of each column
    
    //     for (let i = 0; i < columns; i++) {
    //         const column = this.createElement("div", "dropdown-column");
    
    //         subItems.slice(i * columnSize, (i + 1) * columnSize).forEach(item => {
    //             const subLink = this.createElement("a", "", { 
    //                 href: `car-details.html?brand=${encodeURIComponent(item.name)}`, 
    //                 innerText: item.name 
    //             });
    
    //             subLink.addEventListener("click", (event) => {
    //                 event.preventDefault();
    //                 const newUrl = `car-details.html?brand=${encodeURIComponent(item.name)}`;
    
    //                 console.log("Navigating to:", newUrl);  // Debugging log
    
    //                 if (window.location.pathname.includes("car-details.html")) {
    //                     // If already on car-details.html, replace to force reload
    //                     window.location.replace(newUrl);
    //                 } else {
    //                     // Otherwise, navigate normally
    //                     window.location.href = newUrl;
    //                 }
    //             });
    
    //             column.append(subLink);
    //         });
    
    //         dropdown.append(column);
    //     }
    
    //     // Append elements
    //     li.append(a, dropdown);
    //     this.navMenu.append(li);
    // }
    

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