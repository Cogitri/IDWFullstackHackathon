import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';

import './App.scss';
import { Hero } from './routes/hero/Hero';

<<<<<<< HEAD
=======
export const FourOFour = () => <p>404 - Page not found 🐱‍👤</p>;

>>>>>>> 002ec46... routing
export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login} />
<<<<<<< HEAD
			<Route exact path='/' component={Hero} />
			<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
=======
			<Route component={FourOFour} />
>>>>>>> 002ec46... routing
		</Switch>
	</BrowserRouter>
);
