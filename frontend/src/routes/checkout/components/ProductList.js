import {
	Avatar,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	makeStyles,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.lightgrey.main,
	},
	list: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	product: {
		cursor: 'pointer',
	},
}));

export const ProductList = React.memo(
	({ productsAndAmounts, title, onProductClick }) => {
		const classes = useStyles();

		return (
			<div data-testid='productList' className={classes.root}>
				{title && (
					<>
						<h1>{title}</h1> <Divider />
					</>
				)}
				{productsAndAmounts &&
					productsAndAmounts.map((productAndAmount) => (
						<div
							key={productsAndAmounts.findIndex((p) => p === productAndAmount)}
						>
							<List className={classes.list}>
								<ListItem
									className={classes.product}
									onClick={() =>
										onProductClick(
											productsAndAmounts.findIndex(
												(p) => p === productAndAmount
											)
										)
									}
								>
									<ListItemAvatar>
										<Avatar
											alt='productImg'
											src={productAndAmount.product.photoUrls[0]}
										/>
									</ListItemAvatar>
									<ListItemText
										primary={productAndAmount.product.name}
										secondary={productAndAmount.amount}
									/>
								</ListItem>
							</List>
						</div>
					))}
			</div>
		);
	}
);
