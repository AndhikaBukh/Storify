import { useEffect, useRef, useState } from 'react';
import {
	Link,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import {
	ArrowRightIcon,
	BackIcon,
	CameraIcon,
	ChevronCircleDownIcon,
	CommentIcon,
	FileIcon,
	HeartIcon,
	SendIcon,
	StarIcon,
	UploadFilledIcon,
	VideoIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { PopUp } from '../../../components/popup/popup';
import { Post } from '../../../components/post/post';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const UploadPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const auth = useAuth();

	const [navbarTitle, setNavbarTitle] = useState('New Post');

	const [showAlert, setShowAlert] = useState(false);
	const [alertType, setAlertType] = useState('info');
	const [alertHeader, setAlertHeader] = useState('No image selected');
	const [alertMessage, setAlertMessage] = useState('Please select an image.');

	const getInputElement = useRef<HTMLLabelElement>(null);
	const [previewImage, setPreviewImage] = useState<string | undefined>(
		undefined
	);
	const [tempStoreUpload, setTempStoreUpload] = useState<File | undefined>(
		undefined
	);

	const [styleOnDragOver, setStyleOnDragOver] = useState('100% 0 0');

	const handleDragOver = (e: any) => {
		setStyleOnDragOver('0');

		e.preventDefault();
	};

	const validateFile = (file: File) => {
		const validTypes = [
			'image/jpeg',
			'image/png',
			'image/jpg',
			'image/webp',
		];
		const validSize = file.size < 5000000;

		if (!validSize) {
			setAlertType('error');
			setAlertHeader('File size too large!');
			setAlertMessage('Please select a file less than 5MB.');
			setShowAlert(true);
			return false;
		}

		if (!validTypes.includes(file.type)) {
			setAlertType('error');
			setAlertHeader('Invalid file type!');
			setAlertMessage('Please select a valid image file.');
			setShowAlert(true);
			return false;
		}

		return true;
	};

	// -------------------------- TEMPORARY ------------------------------ //

	const storeUser = auth
		?.requestMe()
		.then((res: any) => {
			if (res.status === 200) return res.data;
		})
		.catch(err => {
			console.log(err);
		});

	// -------------------------- TEMPORARY ------------------------------ //

	const validateUpload = () => {
		if (previewImage === undefined) {
			setAlertType('info');
			setAlertHeader('No image selected');
			setAlertMessage('Please select an image.');
			setShowAlert(true);
			return;
		}

		navigate('/upload/preview');
	};

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Upload';
	}, []);

	useEffect(() => {
		if (location.pathname === '/upload/preview') {
			setNavbarTitle('Preview');
		} else setNavbarTitle('New Post');
	}, [location.pathname]);

	return (
		<div
			className="upload"
			onDragOver={e => {
				e.preventDefault();
				e.stopPropagation();

				setStyleOnDragOver('0');
			}}
			onDragExit={e => {
				e.preventDefault();
				e.stopPropagation();

				setStyleOnDragOver('100% 0 0');
			}}
		>
			<Navbar
				type="top"
				className="upload__top-navbar"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="/" className="navbar__button">
								<BackIcon />
							</Link>
							{navbarTitle}
						</>
					),
					rightContent: (
						<button
							className="navbar__button"
							onClick={validateUpload}
						>
							<ArrowRightIcon color="#295adb" />
						</button>
					),
				}}
			/>

			<div className="upload__popup-container">
				<PopUp
					variant="alert"
					show={showAlert}
					type={alertType}
					header={alertHeader}
					content={alertMessage}
					onClose={() => setShowAlert(false)}
				/>
			</div>

			<div className="upload__wrapper">
				<Routes>
					<Route
						path="/"
						element={
							<div
								className="upload__content"
								style={{
									padding: styleOnDragOver,
								}}
							>
								<div
									className="upload__content__preview"
									style={{
										backgroundImage: `url(${previewImage})`,
									}}
								></div>

								<div className="upload__content__input">
									<div className="upload__content__input__header">
										<button className="upload__content__input__header__title">
											Upload Image
										</button>

										<div className="upload__content__input__header__icon upload__content__input__header__icon--button">
											<CameraIcon />
										</div>
									</div>

									<label
										className="upload__content__input__body"
										htmlFor="upload-input"
										onDragOver={() => {
											getInputElement.current?.classList.add(
												'upload__content__input__body--active'
											);
										}}
										onDragExit={() => {
											getInputElement.current?.classList.remove(
												'upload__content__input__body--active'
											);
										}}
										onDrop={e => {
											e.preventDefault();
											e.stopPropagation();

											setStyleOnDragOver('100% 0 0');

											getInputElement.current?.classList.remove(
												'upload__content__input__body--active'
											);

											const file =
												e.dataTransfer.files[0];

											validateFile(file);

											if (file) {
												const reader = new FileReader();

												reader.onload = () => {
													setPreviewImage(
														reader.result as string
													);
												};

												reader.readAsDataURL(file);
											}
										}}
										ref={getInputElement}
									>
										<div className="upload__content__input__body__icon">
											<UploadFilledIcon color="#ffffff" />
										</div>
										<div className="upload__content__input__body__text">
											Drag and drop <br /> or click to
											upload a file
										</div>
										<input
											id="upload-input"
											type="file"
											accept="image/*"
											onChange={e => {
												if (!e.target.files) return;

												const file = e.target.files[0];
												validateFile(file);

												if (validateFile(file)) {
													e.target.files[0] &&
														setPreviewImage(
															URL.createObjectURL(
																e.target
																	.files[0]
															)
														);
												}
											}}
										/>
									</label>
								</div>
							</div>
						}
					/>

					<Route
						path="/preview"
						element={
							<div className="upload__content upload__content--preview">
								<div className="upload__content__post">
									<div className="post">
										<div className="post__container">
											<div className="post__author">
												<img
													className="post__author__avatar"
													// src={profilePicture}
													alt=""
												/>
												<div className="post__author__username">
													{/* {postAuthor} */}
												</div>
												<div className="post__author__valid-name">
													{/* {postAuthorName} */}
												</div>
											</div>

											<div className="post__content">
												<img
													className="post__content-image"
													src={previewImage}
													alt=""
												/>

												<div className="post__content-action">
													<div className="post__content-action__icon">
														<HeartIcon />
													</div>
													<div className="post__content-action__wrapper">
														<div className="post__content-action__icon">
															<SendIcon />
														</div>
														<div className="post__content-action__icon">
															<CommentIcon />
														</div>
														<div className="post__content-action__icon">
															<StarIcon />
														</div>
													</div>
												</div>

												<div className="post__content-text">
													<div className="post__content-text__likes">
														<div className="post__content-text__likes-amount">
															{/* {likes} */}
														</div>
														<div className="post__content-text__likes-text">
															Likes
														</div>
													</div>

													<div className="post__content-text__container">
														<div className="post__content-text__username">
															{/* {postAuthor} */}
														</div>
														<div className="post__content-text__wrapper">
															{/* {postDescription} */}
														</div>
													</div>

													<div className="post__content-text__time">
														{/* {postTime} */}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						}
					/>
				</Routes>
			</div>
		</div>
	);
};
