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
import { productResponseDataMock } from '../../../constants/mocks';
import { addProductToCart } from '../../../utils/state/cart';
import { addProductToWishlist } from '../../../utils/state/wishlist';
import { apiURL } from '../../../constants/apiUrl';

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
		margin: theme.spacing(2),
		height: 250,
		width: 250,
	},
	media: {
		cursor: 'pointer',
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
		`${apiURL}/user/products/${farmerId}`,
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
									<Button
										size='small'
										color='primary'
										onClick={() => addProductToWishlist({ product, amount: 1 })}
									>
										Wish
									</Button>
									<p>{product.price}</p>
									<Button
										size='small'
										color='primary'
										onClick={() => addProductToCart({ product, amount: 1 })}
									>
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
