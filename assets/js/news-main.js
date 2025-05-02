import { NavBarView } from "./nav-view.js";
import { NewsView } from "./news.js";

// Initialize navigation and News page
const navParent = document.querySelector('.nav-container');
const newsContainer = document.querySelector('.news-container');
const mainContent = newsContainer.querySelector('.main-content-container');

new NavBarView(navParent);
new NewsView(mainContent);