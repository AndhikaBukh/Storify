import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

export const Landing = () => {
	return (
		<div className="landing">
			<div className="landing__logo-container">
				<img className="landing__logo" src="./logo.png" alt="" />
			</div>

			<div className="landing__header">
				<h4 className="landing__app-title">Project Sylly</h4>

				<h1 className="landing__app-description">
					Everything that you need just in your pocket!
				</h1>
			</div>

			<div className="landing__buttons">
				<Link to="login" className="landing__button landing--login">
					Log In
				</Link>

				<Link to="signup" className="landing__button landing--signup">
					Sign Up
				</Link>
			</div>
		</div>
	);
};
