import { useState } from 'react';
import objEqual from '../objEqual';

export const useAuth = () => {
	const [storedUser] = useState(
		JSON.parse(localStorage.getItem('user') ?? '{}')
	);
	const user = objEqual(storedUser, {}) ? undefined : storedUser;

	return { user };
};
