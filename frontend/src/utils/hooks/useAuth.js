import React, { useState } from 'react';

export const useAuth = () => {
	// TODO implement
	const [user] = useState(undefined);
	return { user };
};
