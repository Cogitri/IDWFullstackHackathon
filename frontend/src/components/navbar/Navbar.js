import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import EcoOutlinedIcon from '@material-ui/icons/EcoOutlined';
import { useAuth } from '../../utils/hooks/useAuth';
import isFarmer from '../../utils/user/isFarmer';
import { logout } from '../../utils/auth/logout';
import { useHistory } from 'react-router-dom';

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
	const { user } = useAuth();
	const history = useHistory();

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
					{!isFarmer(user) && (
						<IconButton color='inherit' href='/checkout'>
							<ShoppingCartOutlinedIcon />
						</IconButton>
					)}
					<IconButton
						color='inherit'
						onClick={() => logout(() => history.push('/'))}
					>
						<ExitToAppOutlinedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
};
