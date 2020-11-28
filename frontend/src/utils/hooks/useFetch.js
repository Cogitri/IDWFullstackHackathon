import { useEffect, useState } from 'react';
import Axios from 'axios-observable';
import { first, startWith } from 'rxjs/operators';

const useFetch = (route, params, mockResultData) => {
	const [data, setData] = useState(undefined);

	useEffect(
		() =>
			Axios.get(route, params)
				.pipe(startWith({ data: mockResultData }), first())
				.subscribe((response) => setData(response.data)),
		[params, route, mockResultData]
	);

	return { data };
};

export default useFetch;
