import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
	LockFilledIcon,
	LockIcon,
	MenuIcon,
	SearchIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import './index.css';
import '../../../styles/unavailable.css';

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
		messeges: "Nice day for fishing ain't it?",
		time: '07/07/2022',
	},
];

const rendermessegesItem = () => {
	return (
		<Link to={`/messegess/${userData.validName}`} className="messeges-item">
			<div
				className="messeges-item__avatar"
				style={{ backgroundImage: `url(${userData.profilePicture})` }}
			></div>

			<div className="messeges-item__content">
				<div className="messeges-item__content__header">
					<div className="messeges-item__content__header__username">
						{userData.username}
					</div>
					<div className="messeges-item__content__header__time">
						{messegesData[0].time}
					</div>
				</div>
				<div className="messeges-item__content__body">
					{messegesData[0].messeges}
				</div>
			</div>
		</Link>
	);
};

export const MessegesPage = () => {
	const auth = useAuth();

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Messeges';
	}, []);

	return (
		<div className="messeges">
			<Navbar
				type="top"
				className="messages--navbar"
				topNavbarAttributes={{
					leftContent: <div>Direct messeges</div>,
					rightContent: (
						<button className="navbar__button">
							<MenuIcon />
						</button>
					),
				}}
			/>

			<div className="messeges__wrapper">
				<div className="messeges__items-container">
					<Input
						className="messeges__items-container__search-bar"
						icon={<SearchIcon />}
						placeholder="Search . . ."
					/>

					<div className="messeges__items-container__items">
						<div className="unavailable-feature">
							<div className="unavailable-feature__icon">
								<LockFilledIcon color="#fff" />
							</div>

							<div className="unavailable-feature__description">
								This feature is unavailable, <br />
								Please wait for update in the future
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
