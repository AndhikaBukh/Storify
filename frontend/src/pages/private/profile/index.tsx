import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import './index.css';

export const ProfilePage = () => {
	return (
		<div className="profile">
			<Navbar className="profile--navbar" type="top" />

			<div className="profile__header">
				<div
					className="profile__header__banner"
					style={{
						backgroundImage:
							'url(https://cdn.discordapp.com/attachments/938793007833047080/993527689614999593/Project_Sylly_2.png)',
					}}
				></div>

				<div className="profile__header__container">
					<div
						className="profile__header__avatar"
						style={{
							backgroundImage:
								'url(https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png)',
						}}
					></div>
					<div className="profile__header__statistics">
						<div className="profile__header__statistics-item">
							<div className="profile__header__statistics-item__value">
								0
							</div>
							<div className="profile__header__statistics-item__description">
								Posts
							</div>
						</div>

						<Seperator type="vertical" />

						<div className="profile__header__statistics-item">
							<div className="profile__header__statistics-item__value">
								0
							</div>
							<div className="profile__header__statistics-item__description">
								Followers
							</div>
						</div>
						<div className="profile__header__statistics-item">
							<div className="profile__header__statistics-item__value">
								0
							</div>
							<div className="profile__header__statistics-item__description">
								Following
							</div>
						</div>
					</div>
				</div>

				<div className="profile__header__content hide">
					<div className="profile__header__content__username"></div>
					<div className="profile__header__content__valid-name"></div>
					<div className="profile__header__content__bio"></div>

					<div className="profile__header__content__action">
						<Link className="react-link" to="/profile/edit">
							<Button className="">Edit Profile</Button>
						</Link>
					</div>
				</div>
			</div>

			<div className="profile__user-posts">
				<div className="profile__user-posts__filter">
					<div className="profile__user-posts__filter__item"></div>
					<div className="profile__user-posts__filter__item"></div>
					<div className="profile__user-posts__filter__item"></div>
				</div>

				<div className="profile__user-posts__container">
					<div className="profile__user-posts__container__item"></div>
				</div>
			</div>
		</div>
	);
};
