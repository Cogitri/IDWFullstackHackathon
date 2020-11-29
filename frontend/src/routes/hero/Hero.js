import React from 'react';

import { ReactComponent as HeroImage } from '../../assets/undraw_farm_girl_dnpe.svg';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	hero: {
		height: '100vh',
		width: '100vw',
		overflow: 'hidden',
		background: 'linear-gradient(90deg, #fff 60%, #4e4e4e 60%)',

		display: 'flex',
		alignItems: 'center',

		'& > *': {
			padding: '0 8rem',
		},
	},
	localHeadingGreen: {
		color: theme.palette.primary,
	},
	title: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	subtitle: {
		margin: '0 0 10rem 2rem',
	},
	getStartedButton: {
		marginLeft: '8rem',
	},
}));

export const Hero = () => {
	const classes = useStyles();

	return (
		<div data-testid={'hero'} className={classes.hero}>
			<div>
				<div className={classes.title}>
					<h1>Go </h1>
					<h1 className={classes.localHeadingGreen}>Local</h1>
				</div>
				<p className={classes.subtitle}>Local Goods, Local Smiles</p>

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
};
