import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Route
import { HomePage } from './pages/private/home';
import { LandingPage } from './pages/public/landing';
import { LoginPage } from './pages/public/login';
import { SignupPage } from './pages/public/signup';
import { ProfilePage } from './pages/public/profile';

// Private Route
import { SettingsPage } from './pages/private/settings';
import { UploadPage } from './pages/private/upload';
import { SearchPage } from './pages/private/search';

const root = ReactDOM.createRoot(
	document.querySelector('.root') as HTMLElement
);

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="signup" element={<SignupPage />} />

					{/* ----------- Semi-Public Route ----------- */}
					<Route path="home" element={<HomePage />} />
					<Route path="/*" element={<ProfilePage />} />

					{/* ----------- Private Route ----------- */}
					<Route path="search" element={<SearchPage />} />
					<Route path="settings" element={<SettingsPage />} />
					<Route path="upload" element={<UploadPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

root.render(<React.StrictMode>{App()}</React.StrictMode>);
