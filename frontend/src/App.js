import React, { createContext, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';

import { ProtectedRoute } from './utils/routes/ProtectedRoute';
import { Hero } from './routes/hero/Hero';
import { Login } from './routes/login/Login';
import { Farmer } from './routes/farmer/Farmer';
import { Products } from './routes/farmer/products/Products';
import { Checkout } from './routes/checkout/Checkout';
import './App.scss';
import theme from './theme';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Switch>
					<ProtectedRoute path='/checkout' component={Checkout} />
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
