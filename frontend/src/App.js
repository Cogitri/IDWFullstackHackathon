import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Login } from './routes/login/Login';

import './App.scss';
import { Hero } from './routes/hero/Hero';

<<<<<<< HEAD
<<<<<<< HEAD
=======
export const FourOFour = () => <p>404 - Page not found 🐱‍👤</p>;

>>>>>>> 002ec46... routing
=======
>>>>>>> 7ae3276... assets; WIP: loginPage
export const App = () => (
	<BrowserRouter>
		<Switch>
			<Route path='/login' component={Login} />
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
			<Route exact path='/' component={Hero} />
			<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
=======
			<Route component={FourOFour} />
>>>>>>> 002ec46... routing
=======
=======
			<Route exact path='/' component={Hero} />
>>>>>>> 4da4a90... routing + herPage
			<Route component={() => <p>404 - Page not found 🐱‍👤</p>} />
>>>>>>> 7ae3276... assets; WIP: loginPage
		</Switch>
	</BrowserRouter>
);
