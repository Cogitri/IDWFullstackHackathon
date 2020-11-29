import Axios from 'axios-observable';
import { first, startWith } from 'rxjs/operators';
import { userRegisterResponseDataMock } from '../../constants/mocks';
import { storeLogin } from './login';

const register = (username, password, license, callback) =>
	Axios.post(`/user`, { username, password, license })
		.pipe(
			startWith({
				data: userRegisterResponseDataMock,
			}),
			first()
		)
		.subscribe(
			({ data }) => storeLogin(data, callback),
			(error) => console.warn('registerError', error)
		);

export default register;
