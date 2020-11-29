import Axios from 'axios-observable';
import { first, startWith } from 'rxjs/operators';
import { userLoginResponseDataMock } from '../../constants/mocks';

export const storeLogin = (userData, callback) => {
	localStorage.setItem('user', JSON.stringify(userData));
	if (callback) callback();
};

const login = (username, password, callback) =>
	Axios.get(`/user/login`, { username, password })
		.pipe(
			startWith({
				data: userLoginResponseDataMock,
			}),
			first()
		)
		.subscribe(
			({ data }) => storeLogin(data, callback),
			(error) => console.warn('loginError', error)
		);

export default login;
