import objEqual from '../objEqual';

const cartKey = 'cart';

export const getProductsFromStorage = () => {
	const currentProducts = JSON.parse(localStorage.getItem(cartKey) ?? '{}');
	return objEqual(currentProducts, {}) ? [] : currentProducts;
};

const writeProductsToStorage = (products) =>
	localStorage.setItem(cartKey, JSON.stringify(products));

export const addProductToCart = (productAndAmount) => {
	const currentProducts = getProductsFromStorage();
	currentProducts.push(productAndAmount);
	writeProductsToStorage(currentProducts);
};

export const removeProductFromCartByIndex = (index) => {
	const currentProducts = getProductsFromStorage();
	const filteredProdcuts = currentProducts.filter((_val, i) => index !== i);
	writeProductsToStorage(filteredProdcuts);
};
