import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	BackIcon,
	BellIcon,
	MessageIcon,
	HomeFilledIcon,
	HomeIcon,
	MenuIcon,
	SearchIcon,
	UserIcon,
} from '../icons';
import './navbar.css';

interface NavbarProps {
	show?: boolean;
	type?: 'top' | 'bottom' | 'page';

	pageNavbarAttributes?: PageNavbarProps;

	className?: string;
}

interface PageNavbarProps {
	pageTitle?: string;
	pageIconLeft?: JSX.Element;
	handlePageIconLeft?: () => void;
	pageIconRight?: JSX.Element;
	handlePageIconRight?: () => void;
}

export const Navbar: FC<NavbarProps> = props => {
	const {
		show = true,
		type,

		pageNavbarAttributes,

		className,
	} = props;

	const {
		pageTitle,
		pageIconLeft,
		handlePageIconLeft,
		pageIconRight,
		handlePageIconRight,
	} = pageNavbarAttributes || {};

	const [homePos, setHomeIcon] = useState<JSX.Element>(<HomeIcon />);
	const [searchPos, setSearchIcon] = useState<JSX.Element>(<SearchIcon />);
	const [messagePos, setBellIcon] = useState<JSX.Element>(<MessageIcon />);
	const [userPos, setUserIcon] = useState<JSX.Element>(<UserIcon />);

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
					<Link to="/home">
						<button className="navbar__icon-wrapper">
							{homePos}
						</button>
					</Link>

					<Link to="/search">
						<button className="navbar__icon-wrapper">
							{searchPos}
						</button>
					</Link>

					<Link to="/message">
						<button className="navbar__icon-wrapper">
							{messagePos}
						</button>
					</Link>

					<Link to="/AndhikaBukh">
						<button className="navbar__icon-wrapper">
							{userPos}
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
