import { useEffect, useState } from 'react';
import Axios from 'axios-observable';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { allowMocks } from '../../constants/mocks';

import { snackbarService } from 'uno-material-ui';

const useFetch = (route, params, mockResultData, shouldUseMock = true) => {
	const [data, setData] = useState(undefined);

	useEffect(() => {
		const willUseMockData =
			mockResultData !== undefined && shouldUseMock && allowMocks;

		const jwt = localStorage.getItem('jwt');

		const $fetch = willUseMockData
			? of({ data: mockResultData })
			: Axios.get(route, { headers: { Authorization: 'JWT '+jwt }, ...params });

		$fetch.pipe(first()).subscribe(
			(response) => {
				setData(response.data)
			},
			(error) => {
				snackbarService.showSnackbar(
					`Error ${JSON.stringify(error.message)}`,
					'error'
				);
				console.warn('fetchError', error);
			}
		);
	}, []);

	return { data };
};

export default useFetch;
