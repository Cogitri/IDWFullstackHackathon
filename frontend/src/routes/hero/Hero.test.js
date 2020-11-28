import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Hero } from './Hero';

describe('hero', () => {
	test('renders', () => {
		const { getByTestId } = render(<Hero />);
		expect(getByTestId('hero')).toBeInTheDocument();
	});

	test('says name', () => {
		const { getByText } = render(<Hero />);
		expect(getByText('Go')).toBeInTheDocument();
		expect(getByText('Local')).toBeInTheDocument();
	});

	test('says slogan', () => {
		const { getByText } = render(<Hero />);
		expect(getByText('Local Goods, Local Smiles')).toBeInTheDocument();
	});
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 08a7188... testing button

	test('renders button', () => {
		const { getByTestId } = render(<Hero />);
		expect(getByTestId('getStartedButton')).toBeInTheDocument();
	});
<<<<<<< HEAD
=======
>>>>>>> 4da4a90... routing + herPage
=======
>>>>>>> 08a7188... testing button
});
