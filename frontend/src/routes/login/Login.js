import React from 'react';
import { LoginForm } from './components/LoginForm';

import './Login.scss';
import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';

export const Login = () => (
	<div data-testid={'login'} className='login'>
		<LoginImage />
		<LoginForm />
	</div>
);
