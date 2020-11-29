import { Button, makeStyles } from '@material-ui/core';
import Axios from 'axios-observable';
import React, { useEffect, useState } from 'react';
import { first, startWith } from 'rxjs/operators';
import { Navbar } from '../../components/navbar/Navbar';
import { userResponseDataMock } from '../../constants/mocks';
import useFetch from '../../utils/hooks/useFetch';
import {
	getProductsFromStorage,
	removeProductFromCartByIndex,
} from '../../utils/state/cart';
import {
	getWishlistProductsFromStorage,
	removeProductFromWishlistByIndex,
} from '../../utils/state/wishlist';
import isFarmer from '../../utils/user/isFarmer';
import { ProductList } from './components/ProductList';

const useStyles = makeStyles((theme) => ({
	root: {
		margin: '2rem',
		display: 'flex',
	},
	leftColumn: {
		flexGrow: 2,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	rightColumn: {
		flexGrow: 1,
	},
}));

export const Checkout = () => {
	const classes = useStyles();
	const [productsInCart, setProductsInCart] = useState(getProductsFromStorage);
	const [productsInWishlist, setProductsInWishlist] = useState(
		getWishlistProductsFromStorage
	);
	const [farmerCovidGuideline, setFarmerCovidGuideline] = useState(undefined);
	const user = useFetch('/user', {}, userResponseDataMock).data;

	useEffect(() => {
		if (!productsInCart.length || !user) return;
		const productId = productsInCart[0].product.id;
		const farmer = user.filter(isFarmer);

		const farmerOfProduct = farmer.find(
			(dude) =>
				dude.products.includes((product) => product.productId === productId)
					?.length !== 0
		);

		if (!farmerOfProduct)
			return console.warn('Error: farmer not found', 'should not occur');

		Axios.get(`user/${farmerOfProduct.username}`)
			.pipe(
				startWith({
					data: userResponseDataMock[0],
				}),
				first()
			)
			.subscribe(
				({ data }) => setFarmerCovidGuideline(data.covidGuidelines),
				(error) => console.warn('farmerCovidGuidelineFetchError', error)
			);
	}, [productsInCart, user]);

	const handleProductClick = (indexClicked) => {
		setProductsInCart((products) =>
			products.filter((_val, i) => indexClicked !== i)
		);
		removeProductFromCartByIndex(indexClicked);
	};

	const handleWishlistProductClick = (indexClicked) => {
		setProductsInWishlist((products) =>
			products.filter((_val, i) => indexClicked !== i)
		);
		removeProductFromWishlistByIndex(indexClicked);
	};

	return (
		<div data-testid='checkout'>
			<Navbar />
			<div className={classes.root}>
				<div className={classes.leftColumn}>
					<ProductList
						productsAndAmounts={productsInCart}
						title='Cart'
						onProductClick={handleProductClick}
					/>
					<ProductList
						productsAndAmounts={productsInWishlist}
						title='Wishlist'
						onProductClick={handleWishlistProductClick}
					/>
					<Button color='primary' variant='contained'>
						Place order
					</Button>
				</div>
				{farmerCovidGuideline && (
					<div className={classes.rightColumn}>
						CovidInfo <br /> {farmerCovidGuideline}
					</div>
				)}
			</div>
		</div>
	);
};
