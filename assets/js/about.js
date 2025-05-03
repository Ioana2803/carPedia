import { carBrands } from '../data/car-object.js';

export class AboutView {
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
        // HERO SECTION
        const heroSection = this.createElement('section', 'about-hero-section');
        const heroContent = this.createElement('div', 'about-hero-content');
        const subtitle = this.createElement('div', 'about-hero-subtitle', { innerText: "ABOUT US" });
        const headline = this.createElement('h1', 'about-hero-headline');
        headline.innerHTML = `DRIVEN BY <span class="accent">PASSION</span>.<br>BUILT THROUGH <span class="accent">LEARNING</span>.`;
        const desc = this.createElement('p', 'about-hero-desc', {
            innerText: "Welcome to carPedia, your go-to digital encyclopedia for all things automotive. This site was created as a personal project by a student passionate about cars and web development — combining technical skills with automotive enthusiasm.\n\ncarPedia is more than a collection of specs. It’s a growing platform built with dedication, aiming to make car information accessible, visual, and easy to explore."
        });
        heroContent.append(subtitle, headline, desc);

        const heroImg = this.createElement('img', 'about-hero-img', {
            src: "./assets/imgs/about-hero.jpg", // Use your own image
            alt: "About CarPedia"
        });

        heroSection.append(heroContent, heroImg);

        // WHAT THIS PROJECT OFFERS SECTION
        const offersSection = this.createElement('section', 'about-offers-section');
        const offersTitle = this.createElement('h2', 'about-offers-title');
        offersTitle.innerHTML = `WHAT THIS PROJECT <span class="accent">OFFERS</span>`;
        const offersSubtitle = this.createElement('div', 'about-offers-subtitle', { innerText: "INFORM. COMPARE. EXPLORE." });
        const offersList = this.createElement('ul', 'about-offers-list');
        [
            { icon: "🔍", text: "Search and Filter Cars Easily" },
            { icon: "🧠", text: "Learn About Brands History" },
            { icon: "⭐", text: "Read User-Based Ratings and Reviews" },
            { icon: "📚", text: "Dive into Well-Structured Car Profiles" }
        ].forEach(item => {
            const li = this.createElement('li');
            li.innerHTML = `<span class="offer-icon">${item.icon}</span> ${item.text}`;
            offersList.appendChild(li);
        });
        const offersDesc = this.createElement('p', 'about-offers-desc', {
            innerText: "Everything here — from the HTML structure to the database logic — was coded and designed as part of a student learning journey."
        });
        offersSection.append(offersTitle, offersSubtitle, offersList, offersDesc);

        // WHY carPedia SECTION
        const whySection = this.createElement('section', 'about-why-section');
        const whyTitle = this.createElement('h2', 'about-why-title');
        whyTitle.innerHTML = `WHY <span class="accent">carPedia?</span>`;
        const whyDesc = this.createElement('p', 'about-why-desc', {
            innerText: "Because great ideas start small.\nBecause learning by building is the most rewarding way to grow.\n\ncarPedia blends clean code, modern design, and real automotive data into a single-page experience. It’s responsive, informative, and evolving — just like its creator."
        });
        const whyList = this.createElement('ul', 'about-why-list');
        [
            { icon: "🧑‍💻", text: "Built by One Student" },
            { icon: "🚗", text: "Fueled by Automotive Curiosity" },
            { icon: "📈", text: "Growing With Each Line of Code" }
        ].forEach(item => {
            const li = this.createElement('li');
            li.innerHTML = `<span class="why-icon">${item.icon}</span> ${item.text}`;
            whyList.appendChild(li);
        });
        whySection.append(whyTitle, whyDesc, whyList);

        // TECHNOLOGIES SECTION
        const techSection = this.createElement('section', 'about-tech-section');
        const techTitle = this.createElement('h2', 'about-tech-title');
        techTitle.innerText = "TECHNOLOGIES USED";
        const techList = this.createElement('ul', 'about-tech-list');
        [
            { icon: "💻", text: "HTML | CSS | JavaScript" }
            // { icon: "🛠️", text: "MySQL (for database-driven features)" }
        ].forEach(item => {
            const li = this.createElement('li');
            li.innerHTML = `<span class="tech-icon">${item.icon}</span> ${item.text}`;
            techList.appendChild(li);
        });
        techSection.append(techTitle, techList);

        // STATS SECTION
        const statsSection = this.createElement('section', 'about-stats-section');
        const statsTitle = this.createElement('h2', 'about-stats-title');
        statsTitle.innerText = "STATS (SO FAR)";
        const statsList = this.createElement('ul', 'about-stats-list');
        [
            { icon: "🚘", text: `${carBrands.length} Models Listed` },
            { icon: "📚", text: "Countless Learning Hours Logged" },
            { icon: "🛠️", text: "Ongoing Feature Development" }
        ].forEach(item => {
            const li = this.createElement('li');
            li.innerHTML = `<span class="stats-icon">${item.icon}</span> ${item.text}`;
            statsList.appendChild(li);
        });
        statsSection.append(statsTitle, statsList);

        // Append all to main-content-container (not about-container)
        this.parentElement.append(heroSection, offersSection, whySection, techSection, statsSection);
    }
}