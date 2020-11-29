import React from 'react';
import { LoginForm } from './components/LoginForm';
import { useAuth } from '../../utils/hooks/useAuth';

import './Login.scss';
import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils/auth/logout';

export const Login = () => {
	const { user } = useAuth();
	const history = useHistory();

	return (
		<div data-testid={'login'} className='login'>
			<LoginImage className='loginImage' />
			{user ? (
				<Button
					variant='contained'
					color='secondary'
					onClick={() => logout(() => history.push('/'))}
				>
					Logout
				</Button>
			) : (
				<LoginForm className='loginForm' />
			)}
		</div>
	);
};
