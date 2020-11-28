import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Farmer } from './Farmer';

describe('farmer', () => {
	test('renders', () => {
		const { getByTestId } = render(<Farmer />);
		expect(getByTestId('farmer')).toBeInTheDocument();
	});
});
