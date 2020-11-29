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
import { userResponseDataMock } from '../../constants/mocks';
import { apiURL } from '../../constants/apiUrl';

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
	const user = useFetch(`${apiURL}/user`, {}, userResponseDataMock).data;
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
