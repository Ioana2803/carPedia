console.log("js loaded...");
import { NavBarView } from "./nav-view.js";
import { HistorySectionView } from './historySectionView.js';
import { SearchModel } from './nav-model.js';

const navParent = document.querySelector('.nav-container');
const parentElement = document.querySelector('.main-content-container');

new NavBarView(navParent);
new SearchModel();
new HistorySectionView(parentElement);
