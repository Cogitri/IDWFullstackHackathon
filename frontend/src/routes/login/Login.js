<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';
import { LoginForm } from './components/LoginForm';
import { useAuth } from '../../utils/hooks/useAuth';

import './Login.scss';
import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';
import { Button } from '@material-ui/core';

export const Login = () => {
	const { user } = useAuth();

	return (
		<div data-testid={'login'} className='login'>
			<LoginImage className='loginImage' />
			{user ? (
				<Button variant='contained' color='secondary'>
					Logout
				</Button>
			) : (
				<LoginForm className='loginForm' />
			)}
		</div>
	);
};
=======
export const Login = () => <p>Login works</p>;
>>>>>>> 002ec46... routing
=======
import React from 'react';
import { LoginForm } from './components/LoginForm';

import './Login.scss';
import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';

export const Login = () => (
	<div data-testid={'login'} className='login'>
		<LoginImage className='loginImage' />
		<LoginForm className='loginForm' />
	</div>
);
>>>>>>> 7ae3276... assets; WIP: loginPage
