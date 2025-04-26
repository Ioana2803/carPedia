console.log("js loaded...");
import { NavBarView } from "./nav-view.js";
import { CarBrandsView } from "./carBrandsView.js";
import { SearchModel } from './nav-model.js';

const navParent = document.querySelector('.nav-container');
new NavBarView(navParent);

const container = document.getElementById('car-brands-container');
new CarBrandsView(container);

new SearchModel();