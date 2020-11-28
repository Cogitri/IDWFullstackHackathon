import Axios from 'axios-observable';
import { first, startWith } from 'rxjs/operators';
import { storeLogin } from './login';

const register = (username, password, license, callback) =>
	Axios.post(`/user`, { username, password, license })
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
			(error) => console.warn('registerError', error)
		);

export default register;
