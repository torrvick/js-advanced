'use strict';

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
	title: "Название альбома",
	artist: "Исполнитель",
	year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

const musicCollection = {
	albums: [
		{
			title: 'Rocka Rolla',
			artist: 'Judas Priest',
			year: '1974',
		},
		{
			title: 'Rust in Peace',
			artist: 'Megadeth',
			year: '1990',
		},
		{
			title: 'Theatre of Pain',
			artist: 'Mötley Crüe',
			year: '1985',
		},
	],
};

// const musicCollection = {};

// musicCollection[Symbol.iterator] = function* () {
// 	for (const album of this.albums) {
// 		yield album;
// 	}
// };

musicCollection[Symbol.iterator] = function () {
	let currentAlbum = 0;
	return {
		next: () => {
			return {
				done: currentAlbum < this.albums?.length ? false : true,
				value: this.albums?.[currentAlbum++],
			};
		},
	};
};

for (const album of musicCollection) {
	const { title, artist, year } = album;
	console.log(`${title} - ${artist} (${year})`);
}

