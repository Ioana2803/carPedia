export class NewsView {
    constructor(parentElement) {
        this.parentElement = parentElement;
        this.apiKey = "e798c4f041404e55b2963fafc24cece9";
        this.keywords = [
            "cars", "automotive", "car industry", "formula one", "f1", "motorsport", "electric cars", "supercars"
        ];
        this.categories = [
            { name: "Formula One", keyword: "formula one" },
            { name: "Electric Cars", keyword: "electric cars" },
            { name: "Car Industry", keyword: "car industry" },
            { name: "Motorsport", keyword: "motorsport" },
            { name: "Supercars", keyword: "supercars" }
        ];
        this.newsData = [];
        this.render();
    }

    async render() {
        this.parentElement.innerHTML = ""; // Clear previous content
        await this.fetchNews();
        this.renderPopular();
        this.renderLatest();
        this.renderCategories();
    }

    async fetchNews() {
        this.query = 'car OR automotive OR "car industry" OR "formula one" OR motorsport OR "electric car" OR supercar';
        const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(this.query)}&from=${this.getDate()}&sortBy=publishedAt&apiKey=${this.apiKey}&pageSize=50&language=en`;
        const response = await fetch(url);
        const data = await response.json();
    
        // Remove duplicates by title and filter for car-related content
        const seen = new Set();
        const carKeywords = [
            "car", "automotive", "car industry", "formula one", "f1", "motorsport", "electric car", "supercar"
        ];
        this.newsData = data.articles.filter(article => {
            if (!article.title) return false;
            // Check for car-related keywords in title or description
            const text = (article.title + " " + (article.description || "")).toLowerCase();
            const isCarRelated = carKeywords.some(kw => text.includes(kw));
            if (!isCarRelated) return false;
            if (seen.has(article.title)) return false;
            seen.add(article.title);
            return true;
        });
    }

    getDate() {
        // Get yesterday's date in YYYY-MM-DD format for freshness
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split('T')[0];
    }

    renderPopular() {
        if (this.newsData.length === 0) return;
        const popularSection = this.createSection("Most Popular");
        const mainNews = this.newsData[0];
        const mainCard = this.createMainCard(mainNews);
        popularSection.appendChild(mainCard);

        // Optionally add a second popular news
        if (this.newsData[1]) {
            const secondCard = this.createMainCard(this.newsData[1], true);
            popularSection.appendChild(secondCard);
        }
        this.parentElement.appendChild(popularSection);
    }

    renderLatest() {
        if (this.newsData.length < 3) return;
        const latestSection = this.createSection("Latest News");
        const grid = document.createElement("div");
        grid.className = "news-grid";
        this.newsData.slice(2, 8).forEach(article => {
            grid.appendChild(this.createNewsCard(article));
        });
        latestSection.appendChild(grid);
        this.parentElement.appendChild(latestSection);
    }

    renderCategories() {
        this.categories.forEach(cat => {
            const catArticles = this.newsData.filter(article =>
                article.title.toLowerCase().includes(cat.keyword) ||
                (article.description && article.description.toLowerCase().includes(cat.keyword))
            ).slice(0, 4);
            if (catArticles.length === 0) return;
            const catSection = this.createSection(cat.name);
            const grid = document.createElement("div");
            grid.className = "news-grid";
            catArticles.forEach(article => grid.appendChild(this.createNewsCard(article)));
            catSection.appendChild(grid);
            this.parentElement.appendChild(catSection);
        });
    }

    createSection(title) {
        const section = document.createElement("section");
        section.className = "news-section";
        const h2 = document.createElement("h2");
        h2.className = "news-section-title accent";
        h2.innerText = title;
        section.appendChild(h2);
        return section;
    }

    createMainCard(article, secondary = false) {
        const card = document.createElement("div");
        card.className = secondary ? "main-news-card secondary" : "main-news-card";
        card.innerHTML = `
            <img src="${article.urlToImage || './assets/imgs/news-placeholder.jpg'}" alt="news image">
            <div class="main-news-content">
                <h3>${article.title}</h3>
                <p>${article.description || ""}</p>
                <a href="${article.url}" target="_blank" class="news-readmore">Read More</a>
            </div>
        `;
        return card;
    }

    createNewsCard(article) {
        const card = document.createElement("div");
        card.className = "news-card";
        card.innerHTML = `
            <img src="${article.urlToImage || './assets/imgs/news-placeholder.jpg'}" alt="news image">
            <div class="news-card-content">
                <h4>${article.title}</h4>
                <p>${article.description || ""}</p>
                <a href="${article.url}" target="_blank" class="news-readmore">Read More</a>
            </div>
        `;
        return card;
    }
}