import React from 'react';
import { LoginForm } from './components/LoginForm';
import { useAuth } from '../../utils/hooks/useAuth';

import { ReactComponent as LoginImage } from '../../assets/undraw_Login_re_4vu2.svg';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { logout } from '../../utils/auth/logout';
import './Login.scss';

// TODO implement
// const useStyles = makeStyles((theme) => ({
// 	login: {
// 		height: '100vh',
// 		width: '100vw',
// 		background: `linear-gradient(90deg, #fff 20%, ${theme.palette.darkbg.main} 20%)`,

// 		display: 'flex',
// 		alignItems: 'center',
// 		justifyContent: 'space-around',
// 	},
// 	loginImage: {
// 		width: '100%',
// 		margin: '0 -20em 0 -10em',
// 		zIndex: 1,
// 		pointerEvents: 'none',
// 	},
// 	loginForm: {
// 		width: '40%',
// 		margin: '4em',
// 	},
// }));

export const Login = () => {
	// const classes = useStyles();
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
