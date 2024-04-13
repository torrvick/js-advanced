const productsKey = 'products';

function addProduct(name, review) {
	const products = getProducts();

	const productExists = products.find((product) => product.name === name);
	if (productExists) {
		addReview(productExists.id, review);
		return;
	}

	products.push({
		id: new Date().getTime(),
		name: name,
		reviews: [
			{
				id: new Date().getTime(),
				text: review,
			},
		],
	});

	saveProducts(products);
}

function addReview(id, review) {
	const products = getProducts();

	const modifiedProduct = products.find((product) => product.id === Number(id));
	if (!modifiedProduct) {
		console.log(`Продукт с id: ${id} не найден`);
		return;
	}

	modifiedProduct.reviews.push({
		id: new Date().getTime(),
		text: review,
	});

	saveProducts(products);
}

function removeReview(productId, reviewId) {
	const products = getProducts();
	const currentProductReviews = products.find((product) => product.id === Number(productId)).reviews;
	const removedReviewIndex = currentProductReviews.findIndex((review) => review.id === Number(reviewId));

	if (removedReviewIndex >= 0) {
		currentProductReviews.splice(removedReviewIndex, 1);
	}

	saveProducts(products);
}

function removeProduct(productId) {
	const products = getProducts();
	const currentProductIndex = products.findIndex((product) => product.id === Number(productId));

	if (currentProductIndex >= 0) {
		products.splice(currentProductIndex, 1);
	}

	saveProducts(products);
}

function getProducts() {
	return JSON.parse(localStorage.getItem(productsKey)) || [];
}

function saveProducts(products) {
	localStorage.setItem(productsKey, JSON.stringify(products));
}

export { getProducts, addProduct, addReview, removeReview, removeProduct };
