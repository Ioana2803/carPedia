import { NavBarView } from "./nav-view.js";
import { MuseumsView } from "./museums.js";

// Initialize navigation and Museums page
const navParent = document.querySelector('.nav-container');
const museumsContainer = document.querySelector('.museums-container');
const mainContent = museumsContainer.querySelector('.main-content-container');

new NavBarView(navParent);
new MuseumsView(mainContent);
