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

import { Product } from './cafe/Product.js';
import { Menu } from './cafe/Menu.js';
import { Chief } from './cafe/Chief.js';
import { Personal } from './cafe/Personal.js';
import { Client } from './cafe/Client.js';
import { Manager } from './cafe/Manager.js';

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

export const staff = new Personal();

staff.addWorker(chiefOleg);
staff.addWorker(chiefAndrey);
staff.addWorker(chiefAnna);

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager(mainMenu, staff);

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

