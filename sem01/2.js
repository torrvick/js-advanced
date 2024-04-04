'use strict';

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

class Product {
	#name;
	constructor(name) {
		this.#name = name;
	}

	getName() {
		return this.#name;
	}
}

class Menu {
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

class Chief {
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

class Personal {
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

// Посетитель ресторана.
class Client {
	constructor(firstname, lastname) {
		this.firstname = firstname;
		this.lastname = lastname;
	}
}

// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
	#orders;
	#menu;
	constructor(currentMenu) {
		this.#orders = new Map();
		this.#menu = currentMenu;
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
				console.log(`\t${details.type} ${name} - ${details.quantity}; ` + `Готовит повар ${staff.getWorkerBySpec(details.type)}`);
			}
		} catch (e) {
			console.log(e.message);
		}
	}
}

const pizza = new Product('Пицца');
const sushi = new Product('Суши');
const dessert = new Product('Десерт');

const mainMenu = new Menu();

mainMenu.addVariant(pizza, 'Маргарита');
mainMenu.addVariant(pizza, 'Пепперони');
mainMenu.addVariant(pizza, 'Три сыра');
mainMenu.addVariant(sushi, 'Филадельфия');
mainMenu.addVariant(sushi, 'Калифорния');
mainMenu.addVariant(sushi, 'Чизмаки');
mainMenu.addVariant(sushi, 'Сеякемаки');
mainMenu.addVariant(dessert, 'Тирамису');
mainMenu.addVariant(dessert, 'Чизкейк');

const chiefOleg = new Chief(pizza, 'Олег');
const chiefAndrey = new Chief(sushi, 'Андрей');
const chiefAnna = new Chief(dessert, 'Анна');

const staff = new Personal();

staff.addWorker(chiefOleg);
staff.addWorker(chiefAndrey);
staff.addWorker(chiefAnna);

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager(mainMenu);

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
	new Client('Иван', 'Иванов'),
	{ name: 'Маргарита', quantity: 1, type: 'Пицца' },
	{ name: 'Пепперони', quantity: 2, type: 'Пицца' },
	{ name: 'Чизкейк', quantity: 1, type: 'Десерт' }
);

// Вывод:
// Клиент Иван заказал:
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client('Павел', 'Павлов');
manager.newOrder(clientPavel, { name: 'Филадельфия', quantity: 5, type: 'Суши' }, { name: 'Калифорния', quantity: 3, type: 'Суши' });
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(clientPavel, { name: 'Калифорния', quantity: 1, type: 'Суши' }, { name: 'Тирамису', quantity: 2, type: 'Десерт' });
// Вывод:
// Клиент Павел заказал:
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна
// manager.getOrders();
manager.newOrder(
	clientPavel,
	{ name: 'Филадельфия', quantity: 1, type: 'Суши' },
	{ name: 'Трубочка с вареной сгущенкой', quantity: 1, type: 'Десерт' }
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует.

