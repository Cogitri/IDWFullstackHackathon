import Axios from 'axios-observable';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { apiURL } from '../../constants/apiUrl';
import {
	allowMocks,
	userRegisterResponseDataMock,
} from '../../constants/mocks';
import { storeLogin } from './login';

import { snackbarService } from 'uno-material-ui';

const register = (username, password, license, callback) => {
	const mockResult = userRegisterResponseDataMock;

	const shouldUseMock = true;

	const willUseMockData =
		mockResult !== undefined && shouldUseMock && allowMocks;

	const $fetch = willUseMockData
		? of({ data: mockResult })
		: Axios.post(`${apiURL}/user`, { username, password, license });

	$fetch.pipe(first()).subscribe(
		({ data }) => storeLogin(data, callback),
		(error) => {
			snackbarService.showSnackbar(
				`Error ${JSON.stringify(error.message)}`,
				'error'
			);
			console.warn('registerError', error);
		}
	);
};

export default register;
