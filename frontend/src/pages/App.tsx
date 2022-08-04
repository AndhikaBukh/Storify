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
import React, { useEffect, useState } from 'react';
import { ForgotPasswordPage } from './public/forgotPassword';
import { LandingPage } from './public/landing';
import { LoginPage } from './public/login';
import { ResetPasswordPage } from './public/resetPassword';
import { SignupPage } from './public/signup';
import { useAuth } from '../utils/auth';
import { FormConfig } from '../utils/form';
import { DebugPage } from './debug';
import { EditProfilePage } from './private/editProfile';
import { NotFoundPage } from './404';

const hideNavbar = ['/landing', '/accounts', '/login', '/signup', '/settings'];

export const App = () => {
	const auth = useAuth();
	const location = useLocation();

	// Handle Navbar Icon Highliting
	const [currentPosition, setCurrentPosition] = useState('/');

	// Handle Navbar visibility
	const [showBottomNavbar, setShowBottomNavbar] = useState(false);

	useEffect(() => {
		// Change icon highlight based on current page
		setCurrentPosition(`/${location.pathname.split('/')[1].toLowerCase()}`);

		// Checks if the current page is in the hideNavbar array
		hideNavbar.includes(`/${location.pathname.split('/')[1]}`)
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
				<Route path="/:username" element={<ProfilePage />} />

				{/* ----------- Private Route ----------- */}
				<Route path="/" element={<HomePage />} />
				<Route path="/messages" element={<MessegesPage />} />
				<Route path="/settings" element={<SettingsPage />} />
				<Route path="/upload/*" element={<UploadPage />} />
				<Route path="/accounts/edit" element={<EditProfilePage />} />

				{/* ----------- Global Matching Route ----------- */}
				<Route path="*" element={<NotFoundPage />} />
			</Routes>

			<Navbar
				show={showBottomNavbar}
				type="bottom"
				activeState={currentPosition}
			/>
		</div>
	);
};
