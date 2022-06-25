import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './home';
import { Landing } from './landing';
import { Login } from './login';
import { Signup } from './signup';

const root = ReactDOM.createRoot(
	document.querySelector('.root') as HTMLElement
);

const App = () => {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="login" element={<Login />} />
					<Route path="home" element={<Home />} />
					<Route path="signup" element={<Signup />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

root.render(<React.StrictMode>{App()}</React.StrictMode>);
