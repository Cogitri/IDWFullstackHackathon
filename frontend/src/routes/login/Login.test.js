import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { Login } from './Login';

describe('login', () => {
	test('renders', () => {
		const { getByTestId } = render(<Login />);
		expect(getByTestId('login')).toBeInTheDocument();
	});
});
