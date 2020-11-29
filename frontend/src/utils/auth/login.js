import Axios from 'axios-observable';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { apiURL } from '../../constants/apiUrl';
import { allowMocks, userLoginResponseDataMock } from '../../constants/mocks';
import { decode } from 'jsonwebtoken';
import { snackbarService } from 'uno-material-ui';

export const storeLogin = (jwt, callback) => {
	localStorage.setItem('jwt', jwt);
	const user = decode(jwt, { complete: true }).payload;
	localStorage.setItem('user', JSON.stringify(user));
	if (callback) callback();
};

const login = (username, password, callback) => {
	const mockResult = userLoginResponseDataMock;

	const shouldUseMock = true;

	const willUseMockData =
		mockResult !== undefined && shouldUseMock && allowMocks;

	const $fetch = willUseMockData
		? of({ data: mockResult })
		: Axios.post(`${apiURL}/user/login`, { username, password });

	$fetch.pipe(first()).subscribe(
		({ data }) => storeLogin(data, callback),
		(error) => {
			snackbarService.showSnackbar(
				`Error ${JSON.stringify(error.message)}`,
				'error'
			);
			console.warn('loginError', error);
		}
	);
};

export default login;
