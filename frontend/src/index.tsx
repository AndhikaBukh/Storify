import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from './pages/App';
import axios from 'axios';
import { AuthProvider } from './utils/auth';

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(
	document.querySelector('.root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);
