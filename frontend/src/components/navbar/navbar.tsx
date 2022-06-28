import { FC } from 'react';
import {
	BackIcon,
	BellIcon,
	ChatIcons,
	HomeFilledIcons,
	MenuIcon,
	SearchIcon,
	UserIcon,
} from '../icons';
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
					<button className="navbar__icon-wrapper">
						<HomeFilledIcons />
					</button>
					<button className="navbar__icon-wrapper">
						<SearchIcon />
					</button>
					<button className="navbar__icon-wrapper">
						<ChatIcons />
					</button>
					<button className="navbar__icon-wrapper">
						<UserIcon />
					</button>
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
