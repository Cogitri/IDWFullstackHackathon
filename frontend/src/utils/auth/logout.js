export const logout = (callback) => {
	localStorage.removeItem('user');
	localStorage.removeItem('jwt');
	localStorage.removeItem('cart');
	localStorage.removeItem('wishlist');
	if (callback) callback();
};
