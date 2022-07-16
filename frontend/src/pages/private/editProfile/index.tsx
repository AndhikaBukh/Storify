import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	BackIcon,
	CheckCircleIcon,
	EnvelopeIcon,
	PenIcon,
	UserFilledIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import './index.css';

interface userDataInterface {
	name?: string;
	username?: string;
	email?: string;
	bio?: string;
	gender?: string;

	followers?: string[];
	following?: string[];
	post?: string[];

	avatar?: string;
	bannerPicture?: string;
}

export const EditProfilePage = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [userData, setUserData] = useState<userDataInterface>({});

	const [editUserData, setEditUserData] = useState<userDataInterface>({
		name: userData.name || '',
		username: userData.username || '',
		email: userData.email || '',
		bio: userData.bio || '',

		followers: userData.followers || [],
		following: userData.following || [],
		post: userData.post || [],

		avatar: userData.avatar || '',
		bannerPicture: userData.bannerPicture || '',
	});

	useEffect(() => {
		auth?.requestMe()
			.then((res: any) => {
				setUserData(res?.data?.user);
				setEditUserData(res?.data?.user);
			})
			.catch(() => {
				navigate('/login');
			});

		document.title = `Project Sylly - Edit Profile`;
	}, []);

	return (
		<div className="edit-profile">
			<Navbar
				className="edit-profile--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link
								to={`/${userData?.username}`}
								className="navbar__button"
							>
								<BackIcon />
							</Link>
							Edit Profile
						</>
					),
					rightContent: localStorage.getItem('authToken') ? (
						<Link to="/settings" className="navbar__button">
							<CheckCircleIcon color="#0494fc" />
						</Link>
					) : null,
				}}
			/>
			<div className="edit-profile__wrapper">
				<div className="edit-profile__header">
					<div
						className="edit-profile__header__banner"
						style={{
							backgroundImage: `url(${userData?.bannerPicture})`,
						}}
					></div>

					<div className="edit-profile__header__container">
						<div
							className="edit-profile__header__avatar"
							style={{
								backgroundImage: `
								${
									userData?.avatar === '' ||
									userData?.avatar === undefined
										? 'url()'
										: `url(${userData?.avatar})`
								}
							`,
							}}
						></div>
						<div className="edit-profile__header__statistics">
							<div className="edit-profile__header__statistics-items">
								<div className="edit-profile__header__statistics-item">
									<div className="edit-profile__header__statistics-item__value">
										{userData?.post?.length}
									</div>
									<div className="edit-profile__header__statistics-item__description">
										Posts
									</div>
								</div>

								<div className="edit-profile__header__statistics-item edit-profile__header__statistics-item--seperator">
									<Seperator
										type="vertical"
										borderWidth={2}
										fade={true}
									/>
								</div>

								<div className="edit-profile__header__statistics-item">
									<div className="edit-profile__header__statistics-item__value">
										{userData?.followers?.length}
									</div>
									<div className="edit-profile__header__statistics-item__description">
										Followers
									</div>
								</div>

								<div className="edit-profile__header__statistics-item edit-profile__header__statistics-item--seperator">
									<Seperator
										type="vertical"
										borderWidth={2}
										fade={true}
									/>
								</div>

								<div className="edit-profile__header__statistics-item">
									<div className="edit-profile__header__statistics-item__value">
										{userData?.following?.length}
									</div>
									<div className="edit-profile__header__statistics-item__description">
										Following
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="edit-profile__header__content">
						{/* Normal Username - Custom Username ignoring availability */}

						<div className="edit-profile__header__content__username">
							{userData?.name === '' && editUserData?.name === ''
								? userData?.username
								: userData?.name !== '' &&
								  editUserData?.name === ''
								? userData?.name
								: editUserData?.name}
						</div>

						{/* Valid Username - Username that is only valid when not taken by someone else */}
						<div className="edit-profile__header__content__valid-name">
							@
							{editUserData?.username === ''
								? userData?.username
								: editUserData?.username}
						</div>
						<div className="edit-profile__header__content__bio">
							{editUserData?.bio === ''
								? userData?.bio
								: editUserData?.bio !== ''
								? editUserData?.bio
								: userData?.bio}
						</div>
					</div>
				</div>

				<div className="edit-profile__body">
					<div className="edit-profile__body__description">
						This is prieview, only you can see it. To save click the
						checkmark on the top left to save your profile
					</div>

					<div className="edit-profile__body__wrapper">
						<Seperator
							className="edit-profile__body__seperator"
							borderWidth={3}
						/>
					</div>

					<div className="edit-profile__body__title">
						Edit Your Profile
					</div>

					<div className="edit-profile__body__container">
						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__container__title">
								Name
							</div>
							<Input
								placeholder="Name"
								value={editUserData?.name}
								onChange={e => {
									setEditUserData({
										...editUserData,
										name: e.target.value,
									});
								}}
								icon={<PenIcon color="#776BF8" />}
							/>
							<div className="edit-profile__body__container__description">
								Customize your name to your liking, help people
								discover your account by using the name that
								you’re known by.
							</div>
						</div>

						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__container__title">
								Username
							</div>
							<Input
								placeholder="Username"
								value={editUserData?.username}
								onChange={e => {
									setEditUserData({
										...editUserData,
										username: e.target.value,
									});
								}}
								icon={<PenIcon color="#776BF8" />}
							/>
							<div className="edit-profile__body__container__description">
								Username is unique that only and can be used to
								identify your account.
							</div>
						</div>

						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__container__title">
								Bio
							</div>
							<Input
								placeholder="Bio"
								value={userData.bio}
								onChange={e => {
									setEditUserData({
										...editUserData,
										bio: e.target.value.replace(
											/^\s*\n/gm,
											''
										),
									});
									e.target.value;
								}}
								type="textarea"
							/>
							<div className="edit-profile__body__container__description">
								A short bio about yourself.
							</div>
						</div>

						<div className="edit-profile__body__wrapper">
							<Seperator
								className="edit-profile__body__seperator"
								borderWidth={3}
							/>
						</div>

						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__title">
								Personal Information
							</div>

							<div className="edit-profile__body__description">
								This is your personal information, where can
								only you able to access or edit it. This won’t
								be part of your public profile
							</div>
						</div>

						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__container__title">
								Email
							</div>
							<Input
								placeholder="Email"
								value={userData?.email}
								icon={<EnvelopeIcon color="#776BF8" />}
								disabled
							/>
							<div className="edit-profile__body__container__description">
								Email ic currently can not be changed. If you
								want to change your email, please contact admin
								or developer.
							</div>
						</div>

						<div className="edit-profile__body__container__item">
							<div className="edit-profile__body__container__title">
								Gender
							</div>
							<Input
								placeholder="Gender"
								value={userData?.gender}
								icon={<UserFilledIcon color="#776BF8" />}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
