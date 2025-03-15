console.log("js loaded...");
import { NavBarView } from "./nav-view.js";
import { CarBrandsView } from "./carBrandsView.js";

const navParent = document.querySelector('.nav-container');
new NavBarView(navParent);

const brandsSection = document.querySelector('.container');
new CarBrandsView(brandsSection);