import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export const Navbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root} data-testid='navbar'>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' className={classes.title}>
						GoLocal
					</Typography>
					<IconButton color='inherit' href='/farmer'>
						<EcoOutlinedIcon />
					</IconButton>
					<IconButton color='inherit' href='/checkout'>
						<ShoppingCartOutlinedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};
