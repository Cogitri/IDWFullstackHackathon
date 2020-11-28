import React from 'react';

import './Hero.scss';
import { ReactComponent as HeroImage } from '../../assets/undraw_farm_girl_dnpe.svg';
import { Button } from '@material-ui/core';

export const Hero = () => (
	<div data-testid={'hero'} className='hero'>
		<div>
			<div>
				<h1>Go </h1>
				<h1 className='localHeadingGreen'>Local</h1>
			</div>
			<p>Local Goods, Local Smiles</p>
<<<<<<< HEAD
			<Button
				data-testid={'getStartedButton'}
				variant='contained'
				color='primary'
				href='/login'
				className='getStartedButton'
			>
=======
			<Button variant='contained' color='primary'>
>>>>>>> 4da4a90... routing + herPage
				Get Started
			</Button>
		</div>
		<HeroImage className='heroImage' />
	</div>
);
