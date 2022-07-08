import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	BackIcon,
	BookmarkIcon,
	ImageIcon,
	MenuIcon,
	PackageIcon,
	SettingsIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import './index.css';

interface userDataType {
	id: number;
	username: string;
	validName: string;

	posts: number;
	followers: number;
	following: number;

	profilePicture: string;
	bannerPicture: string;

	isFollowed: boolean;
}

const userData = {
	username: 'Andhika Bukhari',
	validName: '@AndhikaBukh',
	bio: 'Front-End Developer Student, At SMK Negeri 1 Surabaya',

	posts: 0,
	followers: 0,
	following: 0,

	profilePicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png',
	// '',
	// undefined,
	bannerPicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/993527689614999593/Project_Sylly_2.png',

	isFollowed: false,
};

export const ProfilePage = () => {
	return (
		<div className="profile">
			<Navbar
				className="profile--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="-1" className="navbar__button">
								<BackIcon />
							</Link>

							{userData.username}
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
						backgroundImage: `url(${userData.bannerPicture})`,
					}}
				></div>

				<div className="profile__header__container">
					<div
						className="profile__header__avatar"
						style={{
							backgroundImage: `
								${
									userData.profilePicture === '' ||
									userData.profilePicture === undefined
										? 'url(https://res.cloudinary.com/dhpbjwguo/image/upload/v1657199909/avatar/default_wmkdzz.png)'
										: `url(${userData.profilePicture})`
								}
							`,
						}}
					></div>
					<div className="profile__header__statistics">
						<div className="profile__header__statistics-items">
							<div className="profile__header__statistics-item">
								<div className="profile__header__statistics-item__value">
									{userData.posts}
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
									{userData.followers}
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
									{userData.following}
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
						{userData.username}
					</div>
					<div className="profile__header__content__valid-name">
						{userData.validName}
					</div>
					<div className="profile__header__content__bio">
						{userData.bio}
					</div>

					<div className="profile__header__content__action">
						<Link className="react-link" to="/profile/edit">
							<Button>Message</Button>
						</Link>
						<Link className="react-link" to="/profile/edit">
							<Button type="bold">Follow</Button>
						</Link>
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
