import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';

import './App.scss';

export const FourOFour = () => <p>404 - Page not found 🐱‍👤</p>;

export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login} />
			<Route component={FourOFour} />
		</Switch>
	</BrowserRouter>
);
