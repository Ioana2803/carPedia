import { NavBarView } from "./nav-view.js";
import { CommunityView } from "./community.js";

const navParent = document.querySelector('.nav-container');
const communityContainer = document.querySelector('.community-container');
const mainContent = communityContainer.querySelector('.main-content-container');

new NavBarView(navParent);
new CommunityView(mainContent);
