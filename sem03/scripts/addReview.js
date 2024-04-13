import { getProducts, addProduct, addReview } from './localStorage.js';

let products = getProducts();

const rootEl = document.querySelector('.root');

rootEl.insertAdjacentHTML(
	'afterbegin',
	`
	<form class="add-product">
		<input type="text" class="product-input" required placeholder="Введите название продукта">
		<div class="suggestion"></div>
		<textarea class="review-input" required placeholder="Введите текст отзыва"></textarea>
		<button class="add-review">Добавить</button>
	</form>
	`
);

const productInputEl = rootEl.querySelector('.product-input');
const suggestionEl = rootEl.querySelector('.suggestion');
const reviewInputEl = rootEl.querySelector('.review-input');

productInputEl.addEventListener('input', () => {
	const inputNameValue = productInputEl.value;

	if (productInputEl.hasAttribute('data-id')) {
		productInputEl.removeAttribute('data-id');
	}
	//prettier-ignore
	const suitableProduct = products.find((product) =>
		product.name.toLowerCase()
		.startsWith(productInputEl.value.toLowerCase()));

	if (suitableProduct && inputNameValue) {
		suggestionEl.textContent = suitableProduct.name;
		suggestionEl.dataset.id = suitableProduct.id;
		suggestionEl.classList.add('active');
	} else {
		clearSugestion();
	}
});

productInputEl.addEventListener('keydown', (e) => {
	if (e.key === 'Tab' && suggestionEl.classList.contains('active')) {
		e.preventDefault();
		fillProductNameInput();
	}
});

suggestionEl.addEventListener('click', () => {
	fillProductNameInput();
});

reviewInputEl.addEventListener('focus', () => {
	suggestionEl.removeAttribute('data-id');
	suggestionEl.classList.remove('active');
});

const addForm = rootEl.querySelector('.add-product');
addForm.addEventListener('submit', (e) => {
	e.preventDefault();

	if (productInputEl.dataset.id) {
		addReview(productInputEl.dataset.id, reviewInputEl.value);
	} else {
		addProduct(productInputEl.value, reviewInputEl.value);
	}

	products = getProducts();
	productInputEl.value = '';
	reviewInputEl.value = '';
	clearSugestion();
});

function fillProductNameInput() {
	productInputEl.value = suggestionEl.textContent;
	productInputEl.dataset.id = suggestionEl.dataset.id;
	clearSugestion();
}

function clearSugestion() {
	suggestionEl.classList.remove('active');
	suggestionEl.textContent = '';
}
