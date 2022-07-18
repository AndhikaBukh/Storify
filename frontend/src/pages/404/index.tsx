import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BackIcon } from '../../components/icons';
import { Navbar } from '../../components/navbar/navbar';
import { Seperator } from '../../components/seperator/seperator';
import './index.css';

export const NotFoundPage = () => {
	useEffect(() => {
		document.title = 'Project Sylly - Not Found';
	});

	return (
		<div className="not-found">
			<Navbar
				className="not-found--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="/" className="navbar__button">
								<BackIcon />
							</Link>
							404 Page
						</>
					),
				}}
			/>

			<div className="not-found__wrapper">
				<div className="not-found__content">
					<div className="not-found__content__title">404</div>

					<div className="not-found__content__seperator">
						<Seperator type="vertical" borderWidth={2} fade />
					</div>

					<div className="not-found__content__description">
						Page not found
					</div>
				</div>
			</div>
		</div>
	);
};
