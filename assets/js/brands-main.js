console.log("js loaded...");
import { NavBarView } from "./nav-view.js";
import { CarBrandsView } from "./carBrandsView.js";

const navParent = document.querySelector('.nav-container');
new NavBarView(navParent);

const container = document.getElementById('car-brands-container');
new CarBrandsView(container);