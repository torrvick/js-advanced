// Вам необходимо реализовать класс, который управляет заказами и поварами.

export class Manager {
	#orders = new Map();
	#menu;
	#staff;
	constructor(currentMenu, currentStaff) {
		this.#menu = currentMenu;
		this.#staff = currentStaff;
	}

	newOrder(client, ...orderPositions) {
		if (!this.#orders.has(client)) {
			this.#orders.set(client, new Map());
		}

		try {
			for (const orderProduct of orderPositions) {
				const clientOrder = this.#orders.get(client);

				const avaliableProductTypes = this.#menu.availableProducts().get(orderProduct.type);
				if (!avaliableProductTypes) {
					throw new Error(`${orderProduct.type} - этот вид блюд не подается`);
				}

				if (!avaliableProductTypes.has(orderProduct.name)) {
					throw new Error(`${orderProduct.type} "${orderProduct.name}" - такого блюда не существует`);
				}

				if (!clientOrder.has(orderProduct.name)) {
					clientOrder.set(orderProduct.name, { quantity: orderProduct.quantity, type: orderProduct.type });
				} else {
					clientOrder.get(orderProduct.name).quantity += orderProduct.quantity;
				}
			}

			console.log(`Клиент ${client.firstname} заказал:`);
			const clientsOrder = this.#orders.get(client);
			for (const [name, details] of clientsOrder) {
				const chief = this.#staff.getWorkerBySpec(details.type);
				console.log(`\t${details.type} ${name} - ${details.quantity}; Готовит повар ${chief.getName()}`);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}
