export class Menu {
	#menu = new Map();

	addVariant(product, name) {
		if (!this.#menu.has(product)) {
			this.#menu.set(product, new Set());
		}
		this.#menu.get(product).add(name);
	}

	availableProducts() {
		const availableProducts = new Map();
		for (const [product, names] of this.#menu) {
			availableProducts.set(product.getName(), names);
		}
		return availableProducts;
	}
}
