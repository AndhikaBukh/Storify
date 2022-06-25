import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/button/button';
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
				<Link to="../login" className="react-link">
					<Button show>Log In</Button>
				</Link>

				<Link to="../signup" className="react-link">
					<Button show type="bold">
						Sign Up
					</Button>
				</Link>
			</div>
		</div>
	);
};
