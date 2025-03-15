console.log("js loaded...");
import { NavBarView } from "./nav-view.js";
import { HistorySectionView } from './historySectionView.js';

const navParent = document.querySelector('.nav-container');
const parentElement = document.querySelector('.main-content-container');

new NavBarView(navParent);
new HistorySectionView(parentElement);