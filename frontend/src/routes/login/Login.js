import React from 'react';
import { LoginForm } from './components/LoginForm';
import { useAuth } from '../../utils/hooks/useAuth';

import './Login.scss';
import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

export const Login = () => {
	const { user } = useAuth();
	const history = useHistory();

	const logout = () => {
		localStorage.removeItem('user');
		history.push('/');
	};

	return (
		<div data-testid={'login'} className='login'>
			<LoginImage className='loginImage' />
			{user ? (
				<Button variant='contained' color='secondary' onClick={logout}>
					Logout
				</Button>
			) : (
				<LoginForm className='loginForm' />
			)}
		</div>
	);
};
