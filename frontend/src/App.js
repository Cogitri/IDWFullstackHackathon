import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';
import { Farmer } from './routes/farmer/Farmer';

import './App.scss';
import { Hero } from './routes/hero/Hero';
import { ProtectedRoute } from './utils/routes/ProtectedRoute';
import { useAuth } from './utils/hooks/useAuth';

export const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<ProtectedRoute path='/farmer' component={Farmer} />
				<Route path='/login' component={Login} />
				<Route exact path='/' component={Hero} />
				<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
			</Switch>
		</BrowserRouter>
	);
};
