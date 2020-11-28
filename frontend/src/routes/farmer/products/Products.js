import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../utils/hooks/useFetch';
import { Navbar } from '../../../components/navbar/Navbar';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Grid,
	makeStyles,
} from '@material-ui/core';

const productResponseDataMock = [
	{
		product: {
			id: 2,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 20,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 21,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 22,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 23,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 24,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 25,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'carrot',
			description: 'string',
			photoUrls: [
				'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 7,
	},
	{
		product: {
			id: 4,
			category: {
				id: 0,
				name: 'string',
			},
			name: 'beans',
			description: 'string',
			photoUrls: [
				'https://www.healthline.com/hlcmsresource/images/AN_images/AN574-Beans-732x549-thumb.jpg',
			],
			tags: [
				{
					id: 0,
					name: 'string',
				},
			],
			expiryDate: 'string',
			manufacturingDate: 'string',
			paymentMethod: 'string',
			deliveryMethod: 'string',
			status: 'available',
			price: 5,
		},
		amount: 9,
	},
];

const useStyles = makeStyles((theme) => ({
	productsWrapper: {
		height: '100%',
		display: 'flex',
		alignItems: 'space-evenly',
	},
	root: {
		maxWidth: 345,
	},
	selProduct: {
		width: '70%',
		backgroundColor: theme.palette.darkbg.main,
		color: theme.palette.darkbg.contrastText,
		padding: '2rem',
	},
	productCard: {
		cursor: 'pointer',
		margin: theme.spacing(2),
		height: 250,
		width: 250,
	},
	media: {
		objectFit: 'center',
		maxWidth: '100%',
		maxHeight: '100%',
	},
	actionsWrapper: {
		display: 'flex',
		justifyContent: 'space-around',
	},
}));

export const Products = () => {
	const classes = useStyles();
	const { farmerId } = useParams();
	const productsAndAmounts = useFetch(
		`/farmer/${farmerId}`,
		{},
		productResponseDataMock
	).data;

	const [selProductAndAmount, setSelProductAndAmount] = useState(undefined);

	return (
		<div data-testid='products'>
			<Navbar />

			{productsAndAmounts && (
				<div className={classes.productsWrapper}>
					<Grid container>
						{productsAndAmounts.map(({ product, amount }) => (
							<Card
								key={product.id}
								className={classes.productCard}
								onClick={() => setSelProductAndAmount({ product, amount })}
							>
								<CardContent>
									<img
										src={product.photoUrls[0]}
										alt='productImg'
										className={classes.media}
									/>
								</CardContent>
								<CardActions className={classes.actionsWrapper}>
									<Button size='small' color='primary'>
										Wish
									</Button>
									<p>{product.price}</p>
									<Button size='small' color='primary'>
										Buy
									</Button>
								</CardActions>
							</Card>
						))}
					</Grid>

					{selProductAndAmount && (
						<div className={classes.selProduct}>
							<p>{productsAndAmounts.amount}</p>
							{Object.keys(selProductAndAmount.product).map((key) => (
								<p key={key}>{`${key}: ${JSON.stringify(
									selProductAndAmount.product[key]
								)}`}</p>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);
};
