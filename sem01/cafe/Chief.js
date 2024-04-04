export class Chief {
	#spec;
	#name;
	constructor(spec, name) {
		this.#spec = spec;
		this.#name = name;
	}

	getSpec() {
		return this.#spec;
	}

	getName() {
		return this.#name;
	}
}
