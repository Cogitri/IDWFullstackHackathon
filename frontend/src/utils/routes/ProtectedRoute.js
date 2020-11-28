import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const ProtectedRoute = ({ ...restProps }) => {
	const { user } = useAuth();
	return user ? <Route {...restProps} /> : <Redirect to={{ pathname: '/' }} />;
};
