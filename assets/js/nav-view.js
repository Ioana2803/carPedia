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
        const firstThreeBrands = carBrands.slice(0, 3).map(brand => ({ name: brand.name, hash: brand.hash }));
        this.addDropdownMenu("Brands", "#", firstThreeBrands);
        this.addMenuItem("News", "#");

        // Menu Button
        this.menuButton = this.createElement("button", "menu-btn", { onclick: () => this.toggleMenu() });
        this.menuButtonImg = this.createElement("img", "", { src: "/assets/imgs/menu2-white.png", alt: "Menu" });
        this.menuButton.append(this.menuButtonImg);
        this.navContainer.append(this.menuButton);

        // Mobile Dropdown Menu
        this.mobileDropdown = this.createElement("div", ["dropdown", "menu-dropdown"]);
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
        const li = this.createElement("li");
        const a = this.createElement("a", "", { href: "brands.html", innerText: text }); // Navigate to brands.html
        const dropdown = this.createElement("div", "dropdown");
    
        subItems.forEach(item => {
            const subLink = this.createElement("a", "", { href: `brands.html#${item.hash}`, innerText: item.name });
    
            subLink.addEventListener("click", (event) => {
                window.location.hash = item.hash; // Update the URL hash
                window.location.href = "car-details.html" + item.hash; // Navigate to the brand's page
            });
    
            dropdown.append(subLink);
        });
    
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