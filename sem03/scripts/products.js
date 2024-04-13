import { getProducts, removeReview, removeProduct } from './localStorage.js';

let products = getProducts();

const rootEl = document.querySelector('.root');

rootEl.innerHTML = getProductHtml();

rootEl.addEventListener('click', ({ target }) => {
	if (target.closest('.reviews-toggle')) {
		const currentProductEl = target.closest('.product');
		currentProductEl.querySelector('.reviews').classList.toggle('opened');
		currentProductEl.querySelector('.reviews-toggle').classList.toggle('opened');
		return;
	}

	if (target.closest('.review-remove')) {
		const currentProductEl = target.closest('.product');
		const currentReviewEl = target.closest('.review');
		const curentProductId = currentProductEl.dataset.id;

		target.closest('.review').remove();
		removeReview(curentProductId, currentReviewEl.dataset.id);

		if (currentProductEl.querySelectorAll('.review').length === 0) {
			removeProduct(curentProductId);
			currentProductEl.remove();
		}
	}
});

function getProductHtml() {
	return products
		.map((product) => {
			return `
                <div class="product" data-id="${product.id}">
                    <div class="product-heading">
                        <h3 class="product-name">${product.name}</h3>
                        <button class="reviews-toggle"></button>
                    </div>
                    <div class="reviews">
                        ${getReviewsHtml(product.reviews)}
                    </div>
                </div>
            `;
		})
		.join('');
}

function getReviewsHtml(reviews) {
	return reviews
		.map((review) => {
			return `
            <div class="review" data-id="${review.id}">
                <p class="review-text">${review.text}</p>
                <button class="review-remove">
                    <i class="fa-regular fa-trash-can"></i>
                </button>
            </div>
            `;
		})
		.join('');
}
