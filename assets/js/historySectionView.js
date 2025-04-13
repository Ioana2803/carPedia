export class HistorySectionView {
    constructor(parentDOMElement) {
        this.parent = parentDOMElement;
        this.init(); 
    }

    createElement(tag, className = "", attributes = {}) {
        const elem = document.createElement(tag);
        if (className) elem.classList.add(className);

        Object.keys(attributes).forEach(attr => {
            elem.setAttribute(attr, attributes[attr]);
        });
        
        return elem;
    }

    init() {
        // Create the main section for the history
        this.section = this.createElement("section", "section");

        // Create and append the image or video
        this.img = this.createElement("img", "", { src: "./assets/imgs/section-edited.jpg", alt: "Cars Showcase" });
        // this.video = this.createElement("video", "", { autoplay: true, muted: true, loop: true });
        // this.video.src = "/imgs/cars-video.mp4";
        // this.section.appendChild(this.video);
        this.section.appendChild(this.img);

        // Create a divider with the title
        this.divider = this.createElement("div", "divider");
        this.title = this.createElement("h2", "", { innerText: "General History" });
        this.divider.appendChild(this.title);

        // Append the divider to the section
        this.section.appendChild(this.divider);

        // Create the history section with two columns (left and right)
        this.historySection = this.createElement("section", "history-section");

        // Create the history container
        this.historyContainer = this.createElement("div", "history-container");

        // Create history columns
        this.historyColumns = this.createElement("div", "history-columns");

        // Create left column
        this.historyLeft = this.createElement("div", "history-left");
        this.historyLeftText1 = this.createElement("p", "", { innerText: "The history of automobiles dates back to the late 19th century, when inventors sought to replace horse-drawn carriages with self-propelled vehicles. The first practical automobile is credited to Karl Benz, who introduced the Benz Patent-Motorwagen in 1886, powered by an internal combustion engine. Around the same time, other inventors, including Gottlieb Daimler and Wilhelm Maybach, developed their own versions of motorized vehicles." });
        this.historyLeftText2 = this.createElement("p", "", { innerText: "Early cars were luxury items, often handcrafted and expensive, but advancements in manufacturing revolutionized the industry." });
        this.historyLeft.append(this.historyLeftText1, this.historyLeftText2);

        // Create right column
        this.historyRight = this.createElement("div", "history-right");
        this.historyRightText1 = this.createElement("p", "", { innerText: "Henry Ford’s introduction of the moving assembly line in 1913 made cars more affordable, bringing mass production and accessibility to the public. Over the decades, automobiles evolved with improved technology, safety features, and fuel efficiency. " });
        this.historyRightText2 = this.createElement("p", "", { innerText: "From steam-powered and gasoline engines to the rise of electric vehicles today, cars have played a pivotal role in shaping modern transportation and global economies, transforming from simple machines to complex, high-tech vehicles integrated with artificial intelligence and automation." });
        this.historyRight.append(this.historyRightText1, this.historyRightText2);

        // Create a vertical divider between the two columns
        this.historyDivider = this.createElement("div", "history-divider");

        // Append columns and divider to the history container
        this.historyColumns.append(this.historyLeft, this.historyDivider, this.historyRight);
        this.historyContainer.appendChild(this.historyColumns);

        // Append the history container to the history section
        this.historySection.appendChild(this.historyContainer);

        // Append both the image section and the history section to the parent container
        this.parent.append(this.section, this.historySection);
    }
}
