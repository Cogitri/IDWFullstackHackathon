import Axios from 'axios-observable';
import { first, startWith } from 'rxjs/operators';

export const storeLogin = (userData, callback) => {
	localStorage.setItem('user', JSON.stringify(userData));
	callback();
};

const login = (username, password, callback) =>
	Axios.get(`/user/login`, { username, password })
		.pipe(
			startWith({
				data: {
					id: 1,
					username: 'b007c',
					passwordHash: 'hash',
					firstName: 'alfred',
					lastName: 'schmidt',
					email: 'as@gmail.com',
					phone: '+asdsad',
					longitude: 100,
					latitude: 50,
				},
			}),
			first()
		)
		.subscribe(
			({ data }) => storeLogin(data, callback),
			(error) => console.warn('loginError', error)
		);

export default login;
