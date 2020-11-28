import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

import { LoginForm } from './LoginForm';

describe('loginForm', () => {
	test('renders', () => {
		const { getByTestId } = render(<LoginForm />);
		expect(getByTestId('loginForm')).toBeInTheDocument();
	});
});
