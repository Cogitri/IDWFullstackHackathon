import { useEffect, useState } from 'react';
import Axios from 'axios-observable';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

const useFetch = (route, params, mockResultData) => {
	const [data, setData] = useState(undefined);

	useEffect(() => {
		const $fetch =
			mockResultData !== undefined
				? of({ data: mockResultData })
				: Axios.get(route, params);

		$fetch.pipe(first()).subscribe((response) => setData(response.data));
	}, [params, route, mockResultData]);

	return { data };
};

export default useFetch;
