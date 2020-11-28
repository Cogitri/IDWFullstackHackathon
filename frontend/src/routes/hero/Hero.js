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

			<Button
				data-testid={'getStartedButton'}
				variant='contained'
				color='primary'
				href='/login'
				className='getStartedButton'
			>
				Get Started
			</Button>
		</div>
		<HeroImage className='heroImage' />
	</div>
);
