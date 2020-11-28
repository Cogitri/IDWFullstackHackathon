import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';

import './App.scss';

export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login} />
			<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
		</Switch>
	</BrowserRouter>
);
