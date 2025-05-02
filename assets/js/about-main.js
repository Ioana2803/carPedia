import { NavBarView } from "./nav-view.js";
import { AboutView } from "./about.js";

// Initialize navigation and About page
const navParent = document.querySelector('.nav-container');
const aboutContainer = document.querySelector('.about-container');
const mainContent = aboutContainer.querySelector('.main-content-container');

new NavBarView(navParent);
new AboutView(mainContent);