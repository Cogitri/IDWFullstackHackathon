import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';
import { Farmer } from './routes/farmer/Farmer';

import './App.scss';
import { Hero } from './routes/hero/Hero';
import { ProtectedRoute } from './utils/routes/ProtectedRoute';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { Products } from './routes/farmer/products/Products';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#66ffa6',
			main: '#00E676',
			dark: '#00b248',
			contrastText: '#000',
		},
		secondary: {
			light: '#ff6f60',
			main: '#e53935',
			dark: '#ab000d',
			contrastText: '#000',
		},
		darkbg: {
			main: '#4c4c4c',
			contrastText: '#fff',
		},
	},
});

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<ProtectedRoute path='/farmer/:farmerId' component={Products} />
					<ProtectedRoute path='/farmer' component={Farmer} />
					<Route path='/login' component={Login} />
					<Route exact path='/' component={Hero} />
					<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
};
