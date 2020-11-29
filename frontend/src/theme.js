import { createMuiTheme } from '@material-ui/core';

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
			main: '#4e4e4e',
			contrastText: '#fff',
		},
		lightgrey: {
			main: '#adabab',
			contrastText: '#fff',
		},
	},
});

export default theme;
