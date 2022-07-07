import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/public/landing';
import { LoginPage } from './pages/public/login';
import { SignupPage } from './pages/public/signup';
import { App } from './pages/App';

const root = ReactDOM.createRoot(
	document.querySelector('.root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="login" element={<LoginPage />} />
				<Route path="signup" element={<SignupPage />} />

				<Route path="/*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
