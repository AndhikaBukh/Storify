import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import './index.css';

export const LandingPage = () => {
	useEffect(() => {
		document.title = 'Project Sylly - Landing Page';
	}, []);

	return (
		<div className="landing">
			<div className="landing__container">
				<div className="landing__logo-container">
					<img className="landing__logo" src="./logo.svg" alt="" />
				</div>

				<div className="landing__content">
					<div className="landing__header">
						<h4 className="landing__header__title">
							Project Sylly
						</h4>

						<h1 className="landing__header__description">
							Made by Developer for Developer.
						</h1>
					</div>

					<div className="landing__buttons">
						<Link to="../login" className="react-link">
							<Button>Log In</Button>
						</Link>

						<Link to="../signup" className="react-link">
							<Button variant="bold">Sign Up</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
