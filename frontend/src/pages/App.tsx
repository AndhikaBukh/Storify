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
import { ForgotPasswordPage } from './public/forgotPassword';
import { LandingPage } from './public/landing';
import { LoginPage } from './public/login';
import { ResetPasswordPage } from './public/resetPassword';
import { SignupPage } from './public/signup';
import { AuthProvider, useAuth } from '../utils/auth';
import { DebugPage } from './debug';
import { ReqAuth } from '../utils/reqAuth';
import { FormConfig } from '../utils/form';
import { ComponentsDebug } from './debug/components';
import { LoginDebug } from './debug/login';
import { SignupDebug } from './debug/signup';

// Testing Data
const userRoutes = ['/AndhikaBukh'];

const allowNavbar = ['/home', '/search', '/upload', '/messages', userRoutes];

export const App = () => {
	const location = useLocation();
	const auth = useAuth();

	// Handle Navbar Icon Highliting
	const [currentPosition, setCurrentPosition] = useState('/home');

	// Handle Navbar visibility
	const [showBottomNavbar, setShowBottomNavbar] = useState(false);

	useEffect(() => {
		// Change icon highlight based on current page
		setCurrentPosition(location.pathname);

		// Checks if the current page is in the allowNavbar array
		allowNavbar.includes(location.pathname) ||
		userRoutes.includes(location.pathname)
			? setShowBottomNavbar(true)
			: setShowBottomNavbar(false);
	}, [location.pathname]);

	return (
		<div className="app">
			<AuthProvider>
				<Routes>
					{/* ----------- Debug Page ----------- */}
					<Route path="/" element={<DebugPage />} />

					{/* ----------- Public Router ----------- */}
					<Route path="landing" element={<LandingPage />} />
					<Route
						path="login"
						element={
							<FormConfig>
								<LoginPage />
							</FormConfig>
						}
					/>
					<Route
						path="signup"
						element={
							<FormConfig>
								<SignupPage />
							</FormConfig>
						}
					/>

					{/* ----------- Optional Route ----------- */}
					<Route
						path="/forgot-password"
						element={<ForgotPasswordPage />}
					/>
					<Route
						path="/reset-password/:id"
						element={<ResetPasswordPage />}
					/>

					{/* ----------- Semi-Public Route ----------- */}
					<Route path="/home" element={<HomePage />} />
					<Route path="/search" element={<SearchPage />} />

					{/* ----------- Users Profile Router ----------- */}
					{/* {userRoutes.map((route, key) => (
						<Route
							key={key}
							path={route}
							element={<ProfilePage />}
						/>
					))} */}

					<Route path={`/AndhikaBukh`} element={<ProfilePage />} />

					{/* ----------- Private Route ----------- */}
					<Route
						path="/messages"
						element={
							<ReqAuth>
								<MessegesPage />
							</ReqAuth>
						}
					/>
					<Route
						path="/settings"
						element={
							<ReqAuth>
								<SettingsPage />
							</ReqAuth>
						}
					/>
					<Route
						path="/upload"
						element={
							<ReqAuth>
								<UploadPage />
							</ReqAuth>
						}
					/>

					{/* ----------- Debug Route ----------- */}
					<Route
						path="/components-debug"
						element={<ComponentsDebug />}
					/>
					<Route
						path="signup-debug"
						element={
							<FormConfig>
								<SignupDebug />
							</FormConfig>
						}
					/>

					<Route
						path="/login-debug"
						element={
							<FormConfig>
								<LoginDebug />
							</FormConfig>
						}
					/>
				</Routes>

				<Navbar
					show={showBottomNavbar}
					type="bottom"
					activeState={currentPosition}
				/>
			</AuthProvider>
		</div>
	);
};
