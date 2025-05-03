import { carBrands } from '../data/car-object.js';

export class SearchModel {
    constructor() {
        this.query = '';
        this.filteredBrands = [];
    }

    updateQuery(query) {
        this.query = query.toLowerCase();
        this.filterBrands();
    }

    filterBrands() {
        // Filter brands based on the query
        this.filteredBrands = carBrands.filter(brand =>
            brand.name.toLowerCase().includes(this.query)
        );
    }

    getFilteredBrands() {
        return this.filteredBrands;
    }

    getFirstBrandHash() {
        if (this.filteredBrands.length > 0) {
            const firstBrand = this.filteredBrands[0];
            return firstBrand.name.replace(/\s+/g, '-');
        }
        return null;
    }
}