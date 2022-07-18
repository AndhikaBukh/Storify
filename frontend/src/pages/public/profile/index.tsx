import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	BackIcon,
	BookmarkIcon,
	ImageIcon,
	PackageIcon,
	SliderIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import { userDataInterface } from '../../../utils/types';
import './index.css';

export const ProfilePage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const [userData, setUserData] = useState<userDataInterface>();
	const _username = location.pathname.split('/')[1].toLowerCase();
	const [countFollowers, setCountFollowers] = useState(
		userData?.followers.length ?? 0
	);

	const getIsFollowing: any = userData?.followers.find((follower: any) => {
		return follower?.username === auth?.user?.username ?? false;
	});

	const [allowFollow, setAllowFollow] = useState<boolean>(false);

	const handleMessageButton = () => {
		// navigate(`/message/${_username}`);
		// console.log('message button clicked');
		console.log(`USERNAME - ${_username}`);
		console.log(`FOLLOW COUNT - ${countFollowers}`);
		console.log(`ALLOW FOLLOW - ${allowFollow}`);
		console.log(
			`MATCH FOLLOW - ${
				getIsFollowing?.username === auth?.user?.username
			}`
		);
	};

	const handleFollowButton = () => {
		auth?.requireLogin();
		auth?.requestFollow(_username);
		setAllowFollow(false);
		setCountFollowers(countFollowers + 1);
	};

	const handleUnFollowButton = () => {
		auth?.requireLogin();
		auth?.requestUnfollow(_username);
		setAllowFollow(true);
		setCountFollowers(countFollowers - 1);
	};

	useEffect(() => {
		auth?.requestUser(_username)
			.then((res: any) => {
				setUserData(res?.data?.user);
				getIsFollowing?.username === auth?.user?.username &&
					setAllowFollow(true);
				setCountFollowers(res?.data?.user?.followers.length);
			})
			.catch(error => {
				console.log(error);
				navigate('/404');
			});

		document.title = `Project Sylly - ${_username}`;
	}, [location.pathname]);

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

							{userData?.username}
						</>
					),
					rightContent: auth ? (
						<Link to="/settings" className="navbar__button">
							<SliderIcon />
						</Link>
					) : null,
				}}
			/>
			<div className="profile__wrapper">
				<div className="profile__header">
					<div
						className="profile__header__banner"
						style={{
							backgroundImage: `url(${userData?.banner})`,
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
										{userData?.post.length || 0}
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
										{userData?.following?.length || 0}
									</div>
									<div className="profile__header__statistics-item__description">
										Following
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
										{countFollowers ?? 0}
									</div>
									<div className="profile__header__statistics-item__description">
										Followers
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="profile__header__content">
						<div className="profile__header__content__username">
							{userData?.username === ''
								? userData?.username
								: userData?.name}
						</div>
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
							{_username === auth?.user?.username ? (
								<Button
									onClick={() => {
										navigate('/accounts/edit');
									}}
								>
									Edit Profile
								</Button>
							) : (
								<>
									<Button onClick={handleMessageButton}>
										Message
									</Button>

									{allowFollow ? (
										<Button
											variant="bold"
											onClick={() => {
												handleFollowButton();
											}}
										>
											Follow
										</Button>
									) : (
										<Button
											variant="optional"
											onClick={() => {
												handleUnFollowButton();
											}}
										>
											Unfollow
										</Button>
									)}
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
		</div>
	);
};
