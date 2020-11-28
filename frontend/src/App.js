import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';

import './App.scss';
import { Hero } from './routes/hero/Hero';

export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login} />
			<Route exact path='/' component={Hero} />
			<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
		</Switch>
	</BrowserRouter>
);
