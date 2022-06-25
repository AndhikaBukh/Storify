import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { BackIcon, BellIcon, MenuIcon } from '../icons';
import './navbar.css';

interface NavbarProps {
	show?: boolean;
	type?: 'top' | 'bottom' | 'page';

	pageTitle?: string;
	pageIconLeft?: JSX.Element;
	handlePageIconLeft?: () => void;
	pageIconRight?: JSX.Element;
	handlePageIconRight?: () => void;

	className?: string;
}

export const Navbar: FC<NavbarProps> = props => {
	const navigate = useNavigate();

	const {
		show = true,
		type,

		pageTitle,
		pageIconLeft = <BackIcon />,
		handlePageIconLeft,
		pageIconRight,
		handlePageIconRight,

		className,
	} = props;

	return show && show ? (
		type === 'top' ? (
			<div
				className={
					className !== undefined
						? `navbar-top ${className}`
						: 'navbar-top'
				}
			>
				<div className="navbar-top__container">
					<div className="navbar-top__wrapper">
						<button className="navbar__icon-wrapper">
							<BellIcon />
						</button>
					</div>

					<div className="navbar-top__wrapper navbar-top__wrapper--align-right">
						<button className="navbar__icon-wrapper">
							<MenuIcon />
						</button>
					</div>
				</div>
			</div>
		) : type === 'bottom' ? (
			<div
				className={
					className !== undefined
						? `navbar-bottom ${className}`
						: 'navbar-bottom'
				}
			>
				<div className="navbar-bottom__container">
					<div className="navbar-bottom__wrapper">
						<button className="navbar__icon-wrapper">
							<BellIcon />
						</button>
						<button className="navbar__icon-wrapper">
							<BellIcon />
						</button>
						<button className="navbar__icon-wrapper">
							<BellIcon />
						</button>
						<button className="navbar__icon-wrapper">
							<BellIcon />
						</button>
					</div>
				</div>
			</div>
		) : (
			// type === 'page'
			<div
				className={
					className !== undefined
						? `navbar-page ${className}`
						: 'navbar-page'
				}
			>
				<div className="navbar-page__container">
					<button
						className="navbar__icon-wrapper"
						onClick={handlePageIconLeft}
					>
						{pageIconLeft}
					</button>

					<div className="navbar-page__header">{pageTitle}</div>

					<button
						className="navbar__icon-wrapper"
						onClick={handlePageIconRight}
					>
						{pageIconRight}
					</button>
				</div>
			</div>
		)
	) : null;
};
