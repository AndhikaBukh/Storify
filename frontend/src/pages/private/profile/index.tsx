import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	BackIcon,
	BookmarkIcon,
	ImageIcon,
	MenuIcon,
	PackageIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const ProfilePage = () => {
	const auth = useAuth();

	return (
		<div className="profile">
			<Navbar
				className="profile--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="/home" className="navbar__button">
								<BackIcon />
							</Link>

							{auth?.userData?.validName}
						</>
					),
					rightContent: (
						<button className="navbar__button">
							<MenuIcon />
						</button>
					),
				}}
			/>

			<div className="profile__header">
				<div
					className="profile__header__banner"
					style={{
						backgroundImage: `url(${auth?.userData?.bannerPicture})`,
					}}
				></div>

				<div className="profile__header__container">
					<div
						className="profile__header__avatar"
						style={{
							backgroundImage: `
								${
									auth?.userData?.profilePicture === '' ||
									auth?.userData?.profilePicture === undefined
										? 'url(https://res.cloudinary.com/dhpbjwguo/image/upload/v1657199909/avatar/default_wmkdzz.png)'
										: `url(${auth?.userData?.profilePicture})`
								}
							`,
						}}
					></div>
					<div className="profile__header__statistics">
						<div className="profile__header__statistics-items">
							<div className="profile__header__statistics-item">
								<div className="profile__header__statistics-item__value">
									{auth?.userData?.post}
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
									{auth?.userData?.followers}
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
									{auth?.userData?.following}
								</div>
								<div className="profile__header__statistics-item__description">
									Following
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="profile__header__content">
					<div className="profile__header__content__username">
						{auth?.userData?.username === ''
							? auth?.userData?.validName
							: auth?.userData?.username}
					</div>
					<div className="profile__header__content__valid-name">
						{auth?.userData?.validName !== '' ||
						auth?.userData?.validName !== undefined
							? '@' + auth?.userData?.validName
							: ''}
					</div>
					<div className="profile__header__content__bio">
						{auth?.userData?.bio !== '' ? auth?.userData?.bio : ''}
					</div>

					<div className="profile__header__content__action">
						{auth?.userData?.validName === '' ||
						auth?.userData?.validName === undefined ? (
							<Link to="/login">
								<Button>Login / Sign Up</Button>
							</Link>
						) : auth?.userData?.validName ? (
							<Link
								className="react-link"
								// to={`/${auth?.userData?.validName}/edit`}
								to="/login"
							>
								<Button>Edit Profile</Button>
							</Link>
						) : (
							<>
								<Link className="react-link" to="/profile/edit">
									<Button>Message</Button>
								</Link>
								<Link className="react-link" to="/profile/edit">
									<Button type="bold">Follow</Button>
								</Link>
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
