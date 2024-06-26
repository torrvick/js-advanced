'use strict';

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
	#books;
	constructor(booksList) {
		this.#books = new Set(booksList);
		if (this.#books.size < booksList.length) {
			throw new Error('В передаваемом списке есть дубликаты');
		}
	}

	get allBooks() {
		return this.#books;
	}

	addBook(title) {
		if (this.hasBook(title)) {
			throw new Error('Книга уже есть в списке');
		}
		this.#books.add(title);
	}

	removeBook(title) {
		if (!this.#books.delete(title)) {
			throw new Error('Такой книги нет в списке');
		}
	}

	hasBook(title) {
		return this.#books.has(title);
	}
}

const newBooks = [
	'Мастер и Маргарита',
	'Преступление и наказание',
	'Над пропастью во ржи',
	'Крестный отец',
	'Грозовой перевал',
	'Зеленая миля',
	'Сто лет одиночества',
	'Робинзон Крузо',
	'Мы',
	'Прощай, оружие!',
	'Чапаев и Пустота',
	'Чума',
];

try {
	const library = new Library(newBooks);
	library.addBook('Аэропорт');
	// library.addBook('Аэропорт');
	library.addBook('Test');
	library.removeBook('Test');
	// library.removeBook('NoTest');

	console.log(library.allBooks);
} catch (e) {
	console.log(e.message);
}

