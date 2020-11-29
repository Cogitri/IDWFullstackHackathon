export const logout = (callback) => {
	localStorage.removeItem('user');
	if (callback) callback();
};
