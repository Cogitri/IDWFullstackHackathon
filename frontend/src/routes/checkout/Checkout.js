import { Button, makeStyles } from '@material-ui/core';
import Axios from 'axios-observable';
import Axios2 from 'axios';
import React, { useEffect, useState } from 'react';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { Navbar } from '../../components/navbar/Navbar';
import { allowMocks, userResponseDataMock } from '../../constants/mocks';
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
import { apiURL } from '../../constants/apiUrl';
import { snackbarService } from 'uno-material-ui';

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
	const user = useFetch(`${apiURL}/user`, {}, userResponseDataMock).data;

	useEffect(() => {
		if (!productsInCart.length || !user) return;
		const productId = productsInCart[0]?.product?.id;
		if(!productId) return;
		const farmer = user.filter(isFarmer);

		const mockResult = userResponseDataMock[0];
		const shouldUseMock = true;
		const willUseMockData =
			mockResult !== undefined && shouldUseMock && allowMocks;

		let farmerOfProductName

		if(willUseMockData) {
			farmerOfProductName = farmer.find(
				(dude) =>
					dude.products.includes((product) => product.productId === productId)
						?.length !== 0
			);
		} else {
			Axios2.post(`${apiURL}/product/getUserId`, {id: productId},  {
				headers: { jwt: localStorage.getItem('jwt') },
			}).then((response) => {
				console.log('response', response);
				return response.data
			}).then(data => {
				console.log('data', data);
				farmerOfProductName = data.username
			})
		}

		if (!farmerOfProductName)
			return console.warn('Error: farmer not found', 'should not occur');

		const $fetch = willUseMockData
			? of({ data: mockResult })
			: Axios.get(`${apiURL}/user/${farmerOfProductName}`, {
					headers: { jwt: localStorage.getItem('jwt') },
			  });

		$fetch.pipe(first()).subscribe(
			({ data }) => setFarmerCovidGuideline(data.covidGuidelines),
			(error) => {
				snackbarService.showSnackbar(
					`Error ${JSON.stringify(error.message)}`,
					'error'
				);
				console.warn('farmerCovidGuidelineFetchError', error);
			}
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
