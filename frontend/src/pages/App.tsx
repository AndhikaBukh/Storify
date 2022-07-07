import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from '../components/navbar/navbar';

// Page Component
import { HomePage } from './private/home';
import { SearchPage } from './private/search';
import { SettingsPage } from './private/settings';
import { UploadPage } from './private/upload';
import { ProfilePage } from './private/profile';
import { MessegesPage } from './private/messages';

export const App = () => {
	return (
		<div className="app">
			<Routes>
				{/* ----------- Semi-Public Route ----------- */}
				<Route path="/home" element={<HomePage />} />
				<Route path="/:username" element={<ProfilePage />} />

				{/* ----------- Private Route ----------- */}
				<Route path="/message" element={<MessegesPage />} />
				<Route path="/search" element={<SearchPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/upload" element={<UploadPage />} />
			</Routes>

			<Navbar type="bottom" />
		</div>
	);
};
