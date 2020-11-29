import objEqual from '../objEqual';

const wishlistKey = 'wishlist';

export const getWishlistProductsFromStorage = () => {
	const currentProducts = JSON.parse(localStorage.getItem(wishlistKey) ?? '{}');
	return objEqual(currentProducts, {}) ? [] : currentProducts;
};

const writeWishlistProductsToStorage = (products) =>
	localStorage.setItem(wishlistKey, JSON.stringify(products));

export const addProductToWishlist = (productAndAmount) => {
	const currentProducts = getWishlistProductsFromStorage();
	currentProducts.push(productAndAmount);
	writeWishlistProductsToStorage(currentProducts);
};

export const removeProductFromWishlistByIndex = (index) => {
	const currentProducts = getWishlistProductsFromStorage();
	const filteredProdcuts = currentProducts.filter((_val, i) => index !== i);
	writeWishlistProductsToStorage(filteredProdcuts);
};
