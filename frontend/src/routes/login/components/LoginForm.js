<<<<<<< HEAD
<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import './LoginForm.scss';

export const LoginForm = ({ initialFormState = 'login' }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [isLookingToSell, setIsLookingToSell] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [license, setLicense] = useState('');

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
				<Button color='primary' variant='contained' type='submit'>
					Signin
				</Button>
			</CardActions>
		</Card>
	);
};
=======
import React from 'react';
=======
import React, { useEffect, useState } from 'react';
>>>>>>> c2f6d4d... loginpage
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import './LoginForm.scss';

<<<<<<< HEAD
<<<<<<< HEAD
export const LoginForm = () => <div data-testid='loginForm'></div>;
>>>>>>> 7ae3276... assets; WIP: loginPage
=======
export const LoginForm = () => (
	<div data-testid='loginForm' className='loginForm'>
		<Card>
=======
export const LoginForm = ({ initialFormState = 'login' }) => {
	const [formState, setFormState] = useState(initialFormState);
	const [isLookingToSell, setIsLookingToSell] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [license, setLicense] = useState('');

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

>>>>>>> c2f6d4d... loginpage
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
				<Button color='primary' variant='contained' type='submit'>
					Signin
				</Button>
			</CardActions>
		</Card>
<<<<<<< HEAD
	</div>
);
>>>>>>> c5b749a... WIP: loginpage
=======
	);
};
>>>>>>> c2f6d4d... loginpage
