import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Navbar } from '../components/navbar/navbar';

// Page Component
import { HomePage } from './private/home';
import { SearchPage } from './private/search';
import { SettingsPage } from './private/settings';
import { UploadPage } from './private/upload';
import { ProfilePage } from './public/profile';
import { MessegesPage } from './private/messages';
import { useEffect, useState } from 'react';
import { ForgotPasswordPage } from './public/forgotPassword';
import { LandingPage } from './public/landing';
import { LoginPage } from './public/login';
import { ResetPasswordPage } from './public/resetPassword';
import { SignupPage } from './public/signup';
import { useAuth } from '../utils/auth';
import { FormConfig } from '../utils/form';
import { DebugPage } from './debug';
import { EditProfilePage } from './private/editProfile';

const hideNavbar = ['/landing', '/accounts/', '/login', '/signup', '/settings'];

export const App = () => {
	const auth = useAuth();
	const location = useLocation();

	// Handle Navbar Icon Highliting
	const [currentPosition, setCurrentPosition] = useState('/');

	// Handle Navbar visibility
	const [showBottomNavbar, setShowBottomNavbar] = useState(false);

	auth?.requestMe()?.catch(() => {
		setShowBottomNavbar(false);
	});

	useEffect(() => {
		// Change icon highlight based on current page
		setCurrentPosition(location.pathname);

		// Checks if the current page is in the hideNavbar array
		hideNavbar.includes(location.pathname)
			? setShowBottomNavbar(false)
			: setShowBottomNavbar(true);
	}, [location.pathname]);

	useEffect(() => {
		auth?.assignUser();
	}, []);

	return (
		<div className="app">
			<Routes>
				{/* ----------- Public Router ----------- */}
				<Route path="/" element={<DebugPage />} />
				<Route path="/landing" element={<LandingPage />} />
				<Route path="/404" element={<LoginPage />} />
				<Route
					path="/login"
					element={
						<FormConfig>
							<LoginPage />
						</FormConfig>
					}
				/>
				<Route
					path="/signup"
					element={
						<FormConfig>
							<SignupPage />
						</FormConfig>
					}
				/>

				{/* ----------- Optional Route ----------- */}
				<Route
					path="/accounts/password/forgot"
					element={<ForgotPasswordPage />}
				/>
				<Route
					path="/accounts/password/reset/:token"
					element={<ResetPasswordPage />}
				/>

				{/* ----------- Semi-Public Route ----------- */}
				<Route path="/search" element={<SearchPage />} />

				<Route path={'/:username'} element={<ProfilePage />} />

				{/* ----------- Private Route ----------- */}
				<Route path="/" element={<HomePage />} />
				<Route path="/messages" element={<MessegesPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/upload" element={<UploadPage />} />
				<Route path="/accounts/edit" element={<EditProfilePage />} />
			</Routes>

			<Navbar
				show={showBottomNavbar}
				type="bottom"
				activeState={currentPosition}
			/>
		</div>
	);
};
