import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../utils/auth';
import {
	BackIcon,
	BellIcon,
	MessageIcon,
	HomeFilledIcon,
	HomeIcon,
	MenuIcon,
	SearchIcon,
	UserIcon,
	UploadIcon,
	PlusSquareIcon,
	MessageFilledIcon,
	PlusSquareFilledIcon,
	UserFilledIcon,
} from '../icons';
import './navbar.css';

interface NavbarProps {
	show?: boolean;
	type?: 'top' | 'bottom' | 'page';

	pageNavbarAttributes?: PageNavbarProps;
	topNavbarAttributes?: TopNavbarProps;
	activeState?: string;

	className?: string;
}

interface TopNavbarProps {
	leftContent?: React.ReactNode;
	rightContent?: React.ReactNode;
}

interface PageNavbarProps {
	pageTitle?: string;
	pageIconLeft?: JSX.Element;
	handlePageIconLeft?: () => void;
	pageIconRight?: JSX.Element;
	handlePageIconRight?: () => void;
}

export const Navbar: FC<NavbarProps> = ({
	show = true,
	type,

	pageNavbarAttributes,
	topNavbarAttributes,
	activeState,

	className,
}) => {
	// Handle Private Routes
	const auth = useAuth();

	const { leftContent, rightContent } = topNavbarAttributes || {};

	const {
		pageTitle,
		pageIconLeft,
		handlePageIconLeft,
		pageIconRight,
		handlePageIconRight,
	} = pageNavbarAttributes || {};

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
						{leftContent !== undefined ? (
							leftContent
						) : (
							<button className="navbar__icon-wrapper">
								<BellIcon />
							</button>
						)}
					</div>

					<div className="navbar-top__wrapper">
						{rightContent !== undefined ? (
							rightContent
						) : (
							<button className="navbar__icon-wrapper">
								<MenuIcon />
							</button>
						)}
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
					<Link to="/home">
						<button className="navbar__icon-wrapper">
							{activeState === '/home' ? (
								<HomeFilledIcon />
							) : (
								<HomeIcon />
							)}
						</button>
					</Link>

					<Link to={auth?.user !== null ? '/search' : '/login'}>
						<button className="navbar__icon-wrapper">
							{activeState === '/search' ? (
								<SearchIcon color="#295ADB" />
							) : (
								<SearchIcon />
							)}
						</button>
					</Link>

					<Link to={auth?.user !== null ? '/upload' : '/login'}>
						<button className="navbar__icon-wrapper">
							{activeState === '/upload' ? (
								<PlusSquareFilledIcon />
							) : (
								<PlusSquareIcon />
							)}
						</button>
					</Link>

					<Link to={auth?.user !== null ? '/messages' : '/login'}>
						<button className="navbar__icon-wrapper">
							{activeState === '/messages' ? (
								<MessageFilledIcon />
							) : (
								<MessageIcon />
							)}
						</button>
					</Link>

					<Link to={auth?.user !== null ? '/AndhikaBukh' : '/login'}>
						<button className="navbar__icon-wrapper">
							{activeState === '/AndhikaBukh' ? (
								<UserFilledIcon />
							) : (
								<UserIcon />
							)}
						</button>
					</Link>
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
						{pageIconLeft === undefined ? (
							<BackIcon />
						) : (
							pageIconLeft
						)}
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
