import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	BackIcon,
	BookmarkIcon,
	ImageIcon,
	MenuIcon,
	PackageIcon,
	SliderIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import './index.css';

interface userDataInterface {
	name: string;
	username: string;
	email: string;
	bio: string;

	followers: string[];
	following: string[];
	post: string[];

	avatar: string;
	bannerPicture: string;
}

export const ProfilePage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [userData, setUserData] = useState<userDataInterface>({
		name: '',
		username: '',
		email: '',
		bio: '',

		followers: [],
		following: [],
		post: [],

		avatar: '',
		bannerPicture: '',
	});

	const _username = location.pathname.split('/')[1];
	const allowProfileEdit = auth?.requestMe()?.then((res: any) => {
		return res?.data?.user?.username === _username;
	});

	const handleMessageButton = () => {
		navigate(`/message/${_username}`);
	};

	const handleFollowButton = () => {
		console.log('follow button clicked');
	};

	const handleUnauthorized = (_action: any) => {
		auth?.requestMe()
			?.catch(() => {
				navigate('/login');
			})
			?.then((res: any) => {
				if (res?.data?.user?.username !== _username) {
					_action();
				}
			});
	};

	useEffect(() => {
		auth?.requestUser(_username)
			.then((res: any) => {
				setUserData(res?.data?.user);
			})
			.catch(() => {
				navigate('/404-page');
			});

		document.title = `Project Sylly - ${_username}`;
	}, []);

	return (
		<div className="profile">
			<Navbar
				className="profile--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="/" className="navbar__button">
								<BackIcon />
							</Link>

							{_username}
						</>
					),
					rightContent: auth ? (
						<Link to="/settings" className="navbar__button">
							<SliderIcon />
						</Link>
					) : null,
				}}
			/>

			<div className="profile__header">
				<div
					className="profile__header__banner"
					style={{
						backgroundImage: `url(${userData?.bannerPicture})`,
					}}
				></div>

				<div className="profile__header__container">
					<div
						className="profile__header__avatar"
						style={{
							backgroundImage: `
								${
									userData?.avatar === '' ||
									userData?.avatar === undefined
										? 'url(https://res.cloudinary.com/dhpbjwguo/image/upload/v1657199909/avatar/default_wmkdzz.png)'
										: `url(${userData?.avatar})`
								}
							`,
						}}
					></div>
					<div className="profile__header__statistics">
						<div className="profile__header__statistics-items">
							<div className="profile__header__statistics-item">
								<div className="profile__header__statistics-item__value">
									{userData?.post.length}
								</div>
								<div className="profile__header__statistics-item__description">
									Posts
								</div>
							</div>

							<div className="profile__header__statistics-item profile__header__statistics-item--seperator">
								<Seperator
									type="vertical"
									borderWidth={2}
									fade={true}
								/>
							</div>

							<div className="profile__header__statistics-item">
								<div className="profile__header__statistics-item__value">
									{userData?.followers.length}
								</div>
								<div className="profile__header__statistics-item__description">
									Followers
								</div>
							</div>

							<div className="profile__header__statistics-item profile__header__statistics-item--seperator">
								<Seperator
									type="vertical"
									borderWidth={2}
									fade={true}
								/>
							</div>

							<div className="profile__header__statistics-item">
								<div className="profile__header__statistics-item__value">
									{userData?.following.length}
								</div>
								<div className="profile__header__statistics-item__description">
									Following
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="profile__header__content">
					{/* Normal Username - Custom Username ignoring availability */}

					<div className="profile__header__content__username">
						{userData?.username === ''
							? userData?.username
							: userData?.username}
					</div>

					{/* Valid Username - Username that is only valid when not taken by someone else */}
					<div className="profile__header__content__valid-name">
						{userData?.username !== '' ||
						userData?.username !== undefined
							? '@' + userData?.username
							: ''}
					</div>
					<div className="profile__header__content__bio">
						{userData?.bio !== '' ? userData?.bio : ''}
					</div>

					<div className="profile__header__content__action">
						{allowProfileEdit ? (
							<Button
								onClick={() => {
									if (localStorage.getItem('authToken'))
										navigate('/edit-profile');
								}}
							>
								Edit Profile
							</Button>
						) : (
							<>
								<Button
									onClick={() =>
										handleUnauthorized(handleMessageButton)
									}
								>
									Message
								</Button>
								<Button
									variant="bold"
									onClick={() =>
										handleUnauthorized(handleFollowButton)
									}
								>
									Follow
								</Button>
							</>
						)}
					</div>
				</div>
			</div>

			<div className="profile__user-posts">
				<div className="profile__user-posts__filter">
					<div className="profile__user-posts__filter__item profile__user-posts__filter__item--active">
						<ImageIcon />
					</div>
					<div className="profile__user-posts__filter__item">
						<PackageIcon />
					</div>
					<div className="profile__user-posts__filter__item">
						<BookmarkIcon />
					</div>
				</div>

				<div className="profile__user-posts__container">
					<div className="profile__user-posts__container__item"></div>
				</div>
			</div>
		</div>
	);
};
