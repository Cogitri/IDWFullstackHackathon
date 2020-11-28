import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';

import './LoginForm.scss';

export const LoginForm = () => (
	<div data-testid='loginForm' className='loginForm'>
		<Card>
			<CardContent className='cardContent'>
				<form className='form' noValidate autoComplete='off'>
					<TextField label='Username' variant='outlined' />
					<TextField label='Password' variant='outlined' />
					<div>
						<br />
						<p>Looking to sell?</p>
						<Switch />
						<TextField label='License' variant='outlined' />
					</div>
				</form>
			</CardContent>
			<CardActions className='actions'>
				<Button color='primary' variant='contained' type='submit'>
					Signin
				</Button>
			</CardActions>
		</Card>
	</div>
);
