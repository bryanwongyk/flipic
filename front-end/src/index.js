import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './components/Auth/Auth0ProviderWithHistory';

const app = (
	<Router>
		<Auth0ProviderWithHistory>
			<App />
		</Auth0ProviderWithHistory>
	</Router>
);
ReactDOM.render(<React.StrictMode>{app}</React.StrictMode>, document.getElementById('root'));
