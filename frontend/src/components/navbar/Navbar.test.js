import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Navbar } from './Navbar';

describe('navbar', () => {
	test('renders', () => {
		const { getByTestId } = render(<Navbar />);
		expect(getByTestId('navbar')).toBeInTheDocument();
	});
});
