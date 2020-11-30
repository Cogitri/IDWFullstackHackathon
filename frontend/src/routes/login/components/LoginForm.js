import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { TextField, Switch } from '@material-ui/core';

import './LoginForm.scss';
import login from '../../../utils/auth/login';
import { useHistory } from 'react-router-dom';
import register from '../../../utils/auth/register';

export const LoginForm = ({ initialFormState = 'login' }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [isLookingToSell, setIsLookingToSell] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [license, setLicense] = useState('');

	const history = useHistory();

	const handleSubmit = () => {
		if (formState === 'login') {
			login(username, password, () => history.push('/farmer'));
		} else {
			register(username, password, license, () => history.push('/farmer'));
		}
	};

	return (
		<Card data-testid='loginForm' className='loginForm'>
			<div className='loginSignupToggleWrapper'>
				<p
					className={formState === 'login' ? '' : 'dimmed'}
					onClick={() => {
						setFormState('login');
						setIsLookingToSell(false);
					}}
				>
					Login
				</p>
				<p className='dimmed'>|</p>
				<p
					className={formState === 'signup' ? '' : 'dimmed'}
					onClick={() => setFormState('signup')}
				>
					Signup
				</p>
			</div>

			<CardContent className='cardContent'>
				<form className='form' noValidate autoComplete='off'>
					<TextField
						label='Username'
						variant='outlined'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<br />
					<TextField
						label='Password'
						variant='outlined'
						value={password}
						type='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					{formState === 'signup' && (
						<>
							<br />
							<br />
							<div className='sellToggleWrapper'>
								<p>Looking to sell?</p>
								<Switch
									value={isLookingToSell}
									onChange={(e) => {
										setIsLookingToSell(e.target.checked);
									}}
								/>
							</div>
							{isLookingToSell && (
								<TextField
									label='License'
									variant='outlined'
									value={license}
									onChange={(e) => setLicense(e.target.value)}
								/>
							)}
						</>
					)}
				</form>
				<br />
			</CardContent>
			<CardActions className='actions'>
				<Button
					color='primary'
					variant='contained'
					type='submit'
					onClick={handleSubmit}
				>
					{formState === 'signup' ? 'Signup' : 'Login'}
				</Button>
			</CardActions>
		</Card>
	);
};
