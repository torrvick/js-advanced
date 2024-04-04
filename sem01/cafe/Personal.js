export class Personal {
	#workers = [];

	addWorker(worker) {
		this.#workers.push(worker);
	}

	getWorkerBySpec(spec) {
		for (const worker of this.#workers) {
			const workerSpec = worker.getSpec();
			if (workerSpec.getName() === spec) {
				return worker.getName();
			}
		}
	}
}
