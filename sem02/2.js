'use strict';

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв, как и продукт, должен иметь уникальное id, для упрощения, используем 
`Date.now()`

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/
const genId = () => {
	return Date.now() + Math.floor(Math.random() * 900) + 100;
};

const initialData = [
	{
		id: genId(),
		product: 'Apple iPhone 13',
		reviews: [
			{
				id: genId(),
				text: 'Отличный телефон! Батарея держится долго.',
			},
			{
				id: genId(),
				text: 'Камера супер, фото выглядят просто потрясающе.',
			},
		],
	},
	{
		id: genId(),
		product: 'Samsung Galaxy Z Fold 3',
		reviews: [
			{
				id: genId(),
				text: 'Интересный дизайн, но дорогой.',
			},
		],
	},
	{
		id: genId(),
		product: 'Sony PlayStation 5',
		reviews: [
			{
				id: genId(),
				text: 'Люблю играть на PS5, графика на высоте.',
			},
		],
	},
];

const DB = initialData;

const rootEl = document.querySelector('.root');

for (const item of DB) {
	const { id, name: product, reviews } = item;
	rootEl.innerHTML += `
        <div class="product" data-prodid="${id}">
            <div class="product-desc">
                <h3 class="product-title">${product}</h3>
                <p class="product-id">${id}</p>
            </div>
            <details class="product-reviews">
                <summary class="reviews-summary">Отзывы</summary>
                <div class="reviews-container">
                </div>
            </details>
            
        </div> 
    `;

	const reviewsEl = rootEl.lastElementChild.querySelector('.reviews-container');
	for (const review of reviews) {
		const { id, text } = review;
		reviewsEl.innerHTML += `
            <div class="review">
                <div class="review-title">${id}</div>
                <div class="review-content">${text}</div>
            </div>
        `;
	}

	reviewsEl.innerHTML += `
            <form class="review-form">
                <textarea class="review-input" placeholder="Напишите Ваше мнение о товаре"></textarea>
                <span class="review-status"></span>
                <button type="submit" class="review-add-btn">Добавить отзыв</button>
            </form>
    `;
}

const addReviewTextEls = document.querySelectorAll('.review-input');
addReviewTextEls.forEach((reviewInputEl) => {
	reviewInputEl.addEventListener('input', () => {
		reviewInputEl.style.height = 'auto';
		reviewInputEl.style.height = reviewInputEl.scrollHeight + 'px';
	});
});

document.querySelector('.root').addEventListener('click', (e) => {
	const target = e.target;
	if (target.classList.contains('review-add-btn')) {
		e.preventDefault();
		const currentProductEl = target.closest('.product');
		const statusEl = currentProductEl.querySelector('.review-status');
		const addReviewTextEl = currentProductEl.querySelector('.review-input');

		const reviewText = addReviewTextEl.value;
		if (reviewText.length < 50 || reviewText.length > 500) {
			statusEl.textContent = reviewText.length < 50 ? 'Отзыв слишком короткий' : 'Отзыв слишком длинный';
			statusEl.classList.add('error');
			setTimeout(() => {
				statusEl.textContent = '';
			}, 1000);
			return;
		}

		const newReview = {
			id: genId(),
			text: reviewText,
		};

		const currentProduct = DB.find((el) => el.id.toString() === currentProductEl.dataset.prodid);
		currentProduct.reviews.push(newReview);

		const newReviewHTML = `
            <div class="review">
                <div class="review-title">${newReview.id}</div>
                <div class="review-content">${newReview.text}</div>
            </div>
        `;

		const reviewsFormEl = target.closest('.product').querySelector('.review-form');
		reviewsFormEl.insertAdjacentHTML('beforeBegin', newReviewHTML);

		addReviewTextEl.value = '';
		statusEl.textContent = '';
		addReviewTextEl.style.height = 'auto';
	}

	if (target.classList.contains('reviews-summary')) {
		const openedReviewsEls = document.querySelectorAll('.product-reviews[open]');
		openedReviewsEls.forEach((openedEl) => {
			openedEl.removeAttribute('open');
			if (openedEl == target.parentNode) {
				e.preventDefault();
			}
		});
	}
});
