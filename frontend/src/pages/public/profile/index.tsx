/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-loading-skeleton/dist/skeleton.css';
import { Button } from '../../../components/button/button';
import {
	BackIcon,
	BookmarkIcon,
	ImageIcon,
	PackageIcon,
	SettingsIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import { userDataInterface } from '../../../utils/types';
import { NotFoundPage } from '../../404';
import './index.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from '../../../hooks/usePrevious';

interface styleFilter {
	position: 'fixed' | undefined;
	top: string | undefined;
}

export const ProfilePage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const history = useHistory();

	// Set if Valid user, if not redirect to 404
	const [isValidUser, setIsValidUser] = useState(true);


	// Control User Data
	const [userData, setUserData] = useState<userDataInterface>({
		name: '',
		username: '',
		bio: '',
	});
	const [postData, setPostData] = useState([]);
	const _username = location.pathname.split('/')[1].toLowerCase();
	const [allowFollow, setAllowFollow] = useState<boolean | undefined>(
		undefined
	);

	// Handle Profile Actions
	const handleMessageButton = () => {
		auth?.requireLogin();
		navigate(`/messages/${_username}`);
	};
	const handleFollowButton = () => {
		auth?.requireLogin();
		auth?.requestFollow(_username);
	};
	const handleUnFollowButton = () => {
		auth?.requireLogin();
		auth?.requestUnfollow(_username);
	};

	// Control Navbar and Posts Container Merging Style
	const postsElement = useRef<HTMLDivElement>(null);
	const [navbarStyle, setNavbarStyle] = useState('0 0 20px 20px');
	const [styleFilter, setStyleFilter] = useState<styleFilter>({
		position: undefined,
		top: '0',
	});

	// Control User Data Fetching
	useEffect(() => {
		auth?.requestUser(_username)
			.then((res: any) => {
				setUserData(res?.data?.user);
				setAllowFollow(!res?.data?.isFollowed);
				setIsValidUser(true);
			})
			.catch(error => {
				console.log(error);
				setIsValidUser(false);
			});

		document.title = `Project Sylly - ${_username}`;
	}, [location.pathname]);

	// Rerender UI when userData is changed
	useEffect(() => {
		auth?.requestUser(_username).then((res: any) => {
			setUserData(res?.data?.user);
			setAllowFollow(!res?.data?.isFollowed);
		});
	}, [userData]);

	// Remove borderRadius on Top Navbar & User Posts, creating seamless interface
	useEffect(() => {
		window.onscroll = () => {
			if (postsElement.current !== null) {
				const calc = postsElement.current?.offsetTop - 86;

				if (window.scrollY > calc) {
					setNavbarStyle('0');
					setStyleFilter({
						position: 'fixed',
						top: '86px',
					});
				} else {
					setNavbarStyle('0 0 20px 20px');
					setStyleFilter({
						position: undefined,
						top: '0',
					});
				}
			}
		};
	}, []);

	return isValidUser ? (
		<div className="profile">
			<Navbar
				className="profile--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<button className="navbar__button" onClick={() => history.previous()}> 
								<BackIcon />
							</button>

							{userData?.username}
						</>
					),
					rightContent: 
						auth?.user !== undefined ? (
							<Link to="/settings" className="navbar__button">
								<SettingsIcon />
							</Link>
						) : null,
				}}
				style={{
					borderRadius: navbarStyle,
				}}
			/>
			<div className="profile__wrapper">
				<SkeletonTheme baseColor="#191c32" highlightColor="#0e101dbf">
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
									backgroundImage: `url(${userData?.avatar})`,
								}}
							>
								{userData?.avatar === undefined ? (
									<Skeleton
										circle={true}
										containerClassName="profile__header__avatar__skeleton"
									/>
								) : null}
							</div>
							<div className="profile__header__statistics">
								<div className="profile__header__statistics-items">
									<div className="profile__header__statistics-item">
										<div className="profile__header__statistics-item__value">
											{userData?.post?.length || 0}
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
											{userData?.followers?.length || 0}
										</div>
										<div className="profile__header__statistics-item__description">
											Followers
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className="profile__header__content">
							<div className="profile__header__content__name">
								{userData?.name !== '' ? (
									userData?.name
								) : userData?.username !== '' ? (
									userData?.username
								) : (
									<Skeleton width={200} />
								)}
							</div>
							<div className="profile__header__content__valid-name">
								{userData?.username !== '' ? (
									'@' + userData?.username
								) : (
									<Skeleton width={120} />
								)}
							</div>
							<div className="profile__header__content__bio">
								{userData?.bio !== '' ? (
									userData?.bio
								) : (
									<Skeleton count={2} />
								)}
							</div>

							<div className="profile__header__content__action">
								{auth?.user?.username === undefined ? (
									<>
										<Skeleton />
										<Skeleton />
									</>
								) : _username === auth?.user?.username ? (
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

										{allowFollow === true ? (
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
				</SkeletonTheme>

				<div className="profile__user-posts" ref={postsElement}>
					<div
						className="profile__user-posts__filter"
						style={styleFilter}
					>
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
						{userData?.post?.map((post: any, key: any) => (
							<Link
								key={key}
								to={`/${_username}/${post._id}`}
								className="profile__user-posts__container__item"
							>
								<div
									className="profile__user-posts__container__item"
									style={{
										backgroundImage: `url(${post.images})`,
									}}
								></div>
							</Link>
						))}
					</div>
				</div>
			</div>

			<div className="profile__post-view"></div>
		</div>
	) : (
		<NotFoundPage />
	);
};
