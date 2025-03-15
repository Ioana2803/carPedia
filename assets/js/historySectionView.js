export class HistorySectionView {
    constructor(parentDOMElement) {
        this.parent = parentDOMElement;
        this.init(); 
    }

    createElement(tag, className = "", attributes = {}) {
        const elem = document.createElement(tag);
        if (className) elem.classList.add(className);
        Object.keys(attributes).forEach(attr => elem[attr] = attributes[attr]);
        return elem;
    }

    init() {
        // Create the main section for the history
        this.section = this.createElement("section", "section");

        // Create and append the image or video
        this.img = this.createElement("img", "", { src: "/assets/imgs/multiple-cars.jpg", alt: "Cars Showcase" });
        // this.video = this.createElement("video", "", { autoplay: true, muted: true, loop: true });
        // this.video.src = "/imgs/cars-video.mp4";
        // this.section.appendChild(this.video);
        this.section.appendChild(this.img);

        // Create a divider with the title
        this.divider = this.createElement("div", "divider");
        this.title = this.createElement("h2", "", { innerText: "Istoria Generală a Automobilelor" });
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
        this.historyLeftText1 = this.createElement("p", "", { innerText: "Istoria automobilelor datează de la sfârșitul secolului al XIX-lea, când inventatorii au încercat să înlocuiască trăsurile trase de cai cu vehicule autopropulsate. Primul automobil practic este atribuit lui Karl Benz, care a introdus Benz Patent-Motorwagen în 1886, alimentat de un motor cu combustie internă. Aproximativ în aceeași perioadă, alți inventatori, precum Gottlieb Daimler și Wilhelm Maybach, și-au dezvoltat propriile versiuni de vehicule motorizate." });
        this.historyLeftText2 = this.createElement("p", "", { innerText: "La început, mașinile erau obiecte de lux, adesea fabricate manual și foarte costisitoare, dar progresele în producție au revoluționat industria. Introducerea liniei de asamblare mobile de către Henry Ford în 1913 a făcut ca automobilele să devină mai accesibile, aducând producția în masă și punând mașinile la dispoziția publicului larg." });
        this.historyLeft.append(this.historyLeftText1, this.historyLeftText2);

        // Create right column
        this.historyRight = this.createElement("div", "history-right");
        this.historyRightText = this.createElement("p", "", { innerText: "De-a lungul decadelor, automobilele au evoluat prin îmbunătățiri tehnologice, caracteristici de siguranță și eficiență a consumului de combustibil. De la motoarele cu aburi și cele pe benzină până la ascensiunea vehiculelor electrice din prezent, automobilele au jucat un rol esențial în modelarea transportului modern și a economiilor globale, transformându-se din mașini simple în vehicule complexe, dotate cu inteligență artificială și automatizare." });
        this.historyRight.appendChild(this.historyRightText);

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
