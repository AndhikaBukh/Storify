import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
	const auth = useAuth();
	const location = useLocation();
	const navigate = useNavigate();
	const [userProfile, setUserProfile] = useState<string>('pleaceholder');

	const { leftContent, rightContent } = topNavbarAttributes || {};

	const {
		pageTitle,
		pageIconLeft,
		handlePageIconLeft,
		pageIconRight,
		handlePageIconRight,
	} = pageNavbarAttributes || {};

	const toProfile = () => {
		auth?.requestMe()
			.then((res: any) => {
				setUserProfile(res?.data?.user?.username);
				navigate(`/${res?.data?.user?.username}`);
				document.title = `Project Sylly - ${res?.data?.user?.username}`;
			})
			.catch(err => {
				navigate('/login');
			});
	};

	useEffect(() => {
		auth?.requestMe().then((res: any) => {
			setUserProfile(res?.data?.user?.username);
		});
	}, []);

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
					<button
						className="navbar__icon-wrapper"
						onClick={() => navigate('/')}
					>
						{activeState === '/' ? (
							<HomeFilledIcon />
						) : (
							<HomeIcon />
						)}
					</button>

					<button
						className="navbar__icon-wrapper"
						onClick={() => navigate('/search')}
					>
						{activeState === '/search' ? (
							<SearchIcon color="#295ADB" />
						) : (
							<SearchIcon />
						)}
					</button>

					<button
						className="navbar__icon-wrapper"
						onClick={() => navigate('/upload')}
					>
						{activeState === '/upload' ? (
							<PlusSquareFilledIcon />
						) : (
							<PlusSquareIcon />
						)}
					</button>

					<button
						className="navbar__icon-wrapper"
						onClick={() => navigate('/messages')}
					>
						{activeState === '/messages' ? (
							<MessageFilledIcon />
						) : (
							<MessageIcon />
						)}
					</button>

					<button
						className="navbar__icon-wrapper"
						onClick={toProfile}
					>
						{activeState === `/${userProfile}` ? (
							<UserFilledIcon />
						) : (
							<UserIcon />
						)}
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
