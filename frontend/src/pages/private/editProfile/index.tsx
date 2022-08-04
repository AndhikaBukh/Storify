import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	BackIcon,
	CameraIcon,
	CheckCircleIcon,
	EnvelopeIcon,
	PenIcon,
	UserFilledIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { PopUp } from '../../../components/popup/popup';
import { Seperator } from '../../../components/seperator/seperator';
import { useAuth } from '../../../utils/auth';
import { userDataInterface } from '../../../utils/types';
import './index.css';

export const EditProfilePage = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState('success');
	const [alertHeader, setAlertHeader] = useState('Success!');
	const [alertMessage, setAlertMessage] = useState(
		'Profile updated successfully'
	);

	const showPopup = (_type: string, _header: string, _message: string) => {
		setAlertType(_type);
		setAlertHeader(_header);
		setAlertMessage(_message);
		setShowAlert(true);
	};

	const [userData, setUserData] = useState<userDataInterface>();
	const [editUserData, setEditUserData] = useState<userDataInterface>();

	const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
		undefined
	);
	const [previewBanner, setPreviewBanner] = useState<string | undefined>(
		undefined
	);

	const getBannerInput = useRef<HTMLInputElement>(null);
	const getAvatarInput = useRef<HTMLInputElement>(null);

	const handleEditedUserData = () => {
		getAvatarInput?.current?.files?.[0] &&
			auth
				?.updateAvatar(getAvatarInput?.current?.files?.[0])
				.then(() => {
					showPopup(
						'success',
						'Success!',
						'Avatar updated successfully'
					);
				})
				.catch(error => {
					showPopup(
						'error',
						'Failed to update avatar',
						`error at ${error.data.message}`
					);
				});
		getBannerInput?.current?.files?.[0] &&
			auth
				?.updateBanner(getBannerInput?.current?.files?.[0])
				.then(() => {
					showPopup(
						'success',
						'Success!',
						'Banner updated successfully'
					);
				})
				.catch(error => {
					showPopup(
						'error',
						'Failed to update banner',
						`error at ${error.data.message}`
					);
				});

		if (editUserData !== userData) {
			auth?.updateProfile(
				editUserData?.name,
				editUserData?.bio,

				editUserData?.gender
			)
				.then(() => {
					showPopup(
						'success',
						'Success!',
						'Profile updated successfully'
					);
				})

				.catch(error => {
					showPopup(
						'error',
						'Failed to update profile',
						`error at ${error.data.message}`
					);
				});
		}
	};

	useEffect(() => {
		auth?.requireLogin();
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

	useEffect(() => {
		auth?.requestMe().then((res: any) => {
			setUserData(res?.data?.user);
		});
	}, [handleEditedUserData]);

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
					rightContent: (
						<button
							className="navbar__button"
							onClick={handleEditedUserData}
						>
							<CheckCircleIcon color="#0494fc" />
						</button>
					),
				}}
			/>

			<div className="edit-profile__popup-container">
				<PopUp
					variant="alert"
					type={alertType}
					show={showAlert}
					header={alertHeader}
					content={alertMessage}
					onClose={() => setShowAlert(false)}
				/>
			</div>

			<div className="edit-profile__wrapper">
				<div className="edit-profile__header">
					<div
						className="edit-profile__header__banner"
						style={{
							backgroundImage:
								previewBanner !== undefined
									? `url(${previewBanner})`
									: `url(${userData?.banner})`,
						}}
					>
						<label
							htmlFor="banner"
							className="edit-profile__header__banner__label"
						>
							<div className="edit-profile__header__banner__label__overlay">
								<div className="edit-profile__header__banner__label__overlay__wrapper">
									<CameraIcon />
								</div>
							</div>
							<input
								type="file"
								name="banner"
								id="banner"
								accept="image/png, image/jpg, image/jpeg"
								ref={getBannerInput}
								onChange={e => {
									if (!e.target.files) return;
									const file = e.target.files[0];
									setPreviewBanner(URL.createObjectURL(file));
								}}
							/>
						</label>
					</div>

					<div className="edit-profile__header__container">
						<div
							className="edit-profile__header__avatar"
							style={{
								backgroundImage:
									previewAvatar !== undefined
										? `url(${previewAvatar})`
										: `url(${userData?.avatar})`,
							}}
						>
							<label
								htmlFor="avatar"
								className="edit-profile__header__avatar__label"
							>
								<div className="edit-profile__header__avatar__label__overlay">
									<CameraIcon />
								</div>
								<input
									type="file"
									name="avatar"
									id="avatar"
									accept="image/png, image/jpg, image/jpeg"
									ref={getAvatarInput}
									onChange={e => {
										if (!e.target.files) return;
										const file = e.target.files[0];
										setPreviewAvatar(
											URL.createObjectURL(file)
										);
									}}
								/>
							</label>
							<button
								className="edit-profile__header__avatar__label__guide"
								onClick={() => getAvatarInput.current?.click()}
							>
								<div className="edit-profile__header__avatar__label__guide__icon">
									<CameraIcon />
								</div>
							</button>
						</div>
						<div className="edit-profile__header__statistics">
							<div className="edit-profile__header__statistics-items">
								<div className="edit-profile__header__statistics-item">
									<div className="edit-profile__header__statistics-item__value">
										{userData?.post?.length || 0}
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
										{userData?.following?.length || 0}
									</div>
									<div className="edit-profile__header__statistics-item__description">
										Following
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
										{userData?.followers?.length || 0}
									</div>
									<div className="edit-profile__header__statistics-item__description">
										Followers
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="edit-profile__header__content">
						<div className="edit-profile__header__content__username">
							{userData?.name === '' && editUserData?.name === ''
								? userData?.username
								: userData?.name !== '' &&
								  editUserData?.name === ''
								? userData?.name
								: editUserData?.name}
						</div>

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
								disabled
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
								value={userData?.bio}
								onChange={e => {
									setEditUserData({
										...editUserData,
										bio: e.target.value.replace(
											/^\s*\n/gm,
											''
										),
									});
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
								Email is currently can not be changed. If you
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
