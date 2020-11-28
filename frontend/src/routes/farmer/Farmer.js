import React from 'react';
import useFetch from '../../utils/hooks/useFetch';
import { Navbar } from '../../components/navbar/Navbar';
import isFarmer from '../../utils/user/isFarmer';
import {
	Card,
	CardContent,
	Divider,
	Grid,
	makeStyles,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const userResponseDataMock = [
	{
		id: 1,
		username: 'b007c',
		passwordHash: 'hash',
		firstName: 'alfred1',
		lastName: 'schmidt',
		email: 'as@gmail.com',
		phone: '+asdsad',
		longitude: 1,
		latitude: 2,
		farmingMethodoligy: 'i hate farming',
		covidGuidelines: 'no mask no fun',
		products: [
			{ productId: '2', amount: 7 },
			{ productId: '4', amount: 9 },
		],
	},
	{
		id: 2,
		username: 'b007c',
		passwordHash: 'hash',
		firstName: 'alfred2',
		lastName: 'schmidt',
		email: 'as@gmail.com',
		phone: '+asdsad',
		longitude: 3,
		latitude: 4,
	},
	{
		id: 3,
		username: 'b007c',
		passwordHash: 'hash',
		firstName: 'alfred3',
		lastName: 'schmidt',
		email: 'as@gmail.com',
		phone: '+asdsad',
		longitude: 6,
		latitude: 5,
		farmingMethodoligy: 'i live to farm',
		covidGuidelines: 'aint no such thing',
		products: [
			{ productId: '0', amount: 5 },
			{ productId: '3', amount: 4 },
		],
	},
	{
		id: 4,
		username: 'b007c',
		passwordHash: 'hash',
		firstName: 'alfred4',
		lastName: 'schmidt',
		email: 'as@gmail.com',
		phone: '+asdsad',
		longitude: 7,
		latitude: 8,
	},
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	farmerCard: {
		backgroundColor: theme.palette.grey,
		margin: theme.spacing(2),
		cursor: 'pointer',
	},
	title: {
		flexGrow: 1,
	},
}));

export const Farmer = () => {
	const classes = useStyles();
	const user = useFetch('/user', {}, userResponseDataMock).data;
	const history = useHistory();

	return (
		<div data-testid='farmer'>
			<Navbar />
			<Grid container className={classes.root}>
				{user &&
					user.filter(isFarmer).map((farmer) => (
						<Card
							key={farmer.id}
							className={classes.farmerCard}
							onClick={() => history.push(`/farmer/${farmer.id}`)}
						>
							<CardContent>
								{`Name: ${farmer.firstName} ${farmer.lastName}`}
								<Divider />
								{`Covid-Guidelines: ${farmer.covidGuidelines}`}
								<Divider />
								{`Location: Long:${farmer.longitude}/Lat:${farmer.latitude}`}
							</CardContent>
						</Card>
					))}
			</Grid>
		</div>
	);
};
