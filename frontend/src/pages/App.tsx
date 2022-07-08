import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Navbar } from '../components/navbar/navbar';

// Page Component
import { HomePage } from './private/home';
import { SearchPage } from './private/search';
import { SettingsPage } from './private/settings';
import { UploadPage } from './private/upload';
import { ProfilePage } from './private/profile';
import { MessegesPage } from './private/messages';
import { useEffect, useState } from 'react';

export const App = () => {
	const location = useLocation();

	const [currentPosition, setCurrentPosition] = useState('/home');

	useEffect(() => {
		setCurrentPosition(location.pathname);
	}, [location.pathname]);

	return (
		<div className="app">
			<Routes>
				{/* ----------- Semi-Public Route ----------- */}
				<Route path="/home" element={<HomePage />} />
				<Route path="/:username" element={<ProfilePage />} />

				{/* ----------- Private Route ----------- */}
				<Route path="/messages" element={<MessegesPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/upload" element={<UploadPage />} />
			</Routes>

			<Navbar type="bottom" activeState={currentPosition} />
		</div>
	);
};
