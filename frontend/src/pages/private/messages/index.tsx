import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, SearchIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import './index.css';

const userData = {
	username: 'Andhika Bukhari',
	validName: '@AndhikaBukh',
	bio: 'Front-End Developer Student, At SMK Negeri 1 Surabaya',

	posts: 0,
	followers: 0,
	following: 0,

	profilePicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png',
	bannerPicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/993527689614999593/Project_Sylly_2.png',

	isDeveloper: true,
	isVerified: true,

	isViewed: false,
	isFollowed: false,
	isBlocked: false,

	isOwner: false,
};

const messegesData = [
	{
		id: 1,
		avatar: userData.profilePicture,
		username: userData.validName,
		message: "Nice day for fishing ain't it?",
		time: '07/07/2022',
	},
];

const renderMessageItem = () => {
	return (
		<Link to={`/messages/${userData.validName}`} className="message-item">
			<div
				className="message-item__avatar"
				style={{ backgroundImage: `url(${userData.profilePicture})` }}
			></div>

			<div className="message-item__content">
				<div className="message-item__content__header">
					<div className="message-item__content__header__username">
						{userData.username}
					</div>
					<div className="message-item__content__header__time">
						{messegesData[0].time}
					</div>
				</div>
				<div className="message-item__content__body">
					{messegesData[0].message}
				</div>
			</div>
		</Link>
	);
};

export const MessegesPage = () => {
	return (
		<div className="messeges">
			<Navbar
				type="top"
				topNavbarAttributes={{
					leftContent: <div>Direct Message</div>,
					rightContent: (
						<button className="navbar__button">
							<MenuIcon />
						</button>
					),
				}}
			/>

			<div className="messeges__items-container">
				<Input
					className="messeges__items-container__search-bar"
					icon={<SearchIcon />}
					placeholder="Search . . ."
				/>

				<div className="messeges__items-container__items">
					{renderMessageItem()}
				</div>
			</div>
		</div>
	);
};
