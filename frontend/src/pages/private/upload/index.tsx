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
	CommentIcon,
	HeartIcon,
	SendIcon,
	StarIcon,
	UploadFilledIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { PopUp } from '../../../components/popup/popup';
import { Post } from '../../../components/post/post';
import { Seperator } from '../../../components/seperator/seperator';
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

	const [styleOnDragOver, setStyleOnDragOver] = useState('100% 0 0');

	const validateFile = (file: File) => {
		const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		const validSize = file.size < 5000000;

		if (!validTypes.includes(file.type)) {
			setAlertType('error');
			setAlertHeader('Invalid file type!');
			setAlertMessage('Please select a valid image file.');
			setShowAlert(true);
			return false;
		}

		if (!validSize) {
			setAlertType('error');
			setAlertHeader('File size too large!');
			setAlertMessage('Please select a file less than 5MB.');
			setShowAlert(true);
			return false;
		}

		return true;
	};

	const [postImage, setPostImage] = useState<File | undefined>(undefined);
	const [postCaption, setPostCaption] = useState<string | undefined>(
		undefined
	);

	const handlePostCreate = () => {
		if (!postImage) {
			setAlertType('error');
			setAlertHeader('No image selected');
			setAlertMessage('Please select an image.');
			setShowAlert(true);
			return;
		}

		if (!postCaption) {
			setAlertType('error');
			setAlertHeader('No caption entered');
			setAlertMessage('Please enter a caption.');
			setShowAlert(true);
			return;
		}

		auth?.postCreate(postImage, postCaption)
			.then((res: any) => {
				if (res.status === 200) {
					navigate('/');
				}
			})
			.catch(error => {
				setAlertType('error');
				setAlertHeader('Error creating post');
				setAlertMessage(error.message);
				setShowAlert(true);
			});
	};

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
		// auth?.requireLogin();

		document.title = 'Project Sylly - Upload';
	}, []);

	useEffect(() => {
		if (location.pathname === '/upload/preview') {
			setNavbarTitle('Create new post');

			postImage === undefined && navigate('/upload');
		} else setNavbarTitle('Choose an image');
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
							onClick={
								location.pathname === '/upload/preview'
									? handlePostCreate
									: validateUpload
							}
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

											if (file && validateFile(file)) {
												const reader = new FileReader();

												reader.onload = () => {
													setPreviewImage(
														reader.result as string
													);
												};

												reader.readAsDataURL(file);
												setPostImage(file);
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
											accept="image/png, image/jpg, image/jpeg"
											name="images"
											onChange={e => {
												if (!e.target.files) return;

												const file = e.target.files[0];
												validateFile(file);

												if (
													file &&
													validateFile(file)
												) {
													setPreviewImage(
														URL.createObjectURL(
															e.target.files[0]
														)
													);
													setPostImage(file);
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
									<div className="upload__content__post__preview">
										<div className="upload__content__post__preview__container">
											<div className="upload__content__post__preview__author">
												<div
													className="upload__content__post__preview__author__avatar"
													style={{
														background: `url(${auth?.user?.avatar}) center center / cover no-repeat`,
													}}
												></div>
												<div className="upload__content__post__preview__author__body">
													<div className="upload__content__post__preview__author__body__name">
														{auth?.user?.name}
													</div>
													<div className="upload__content__post__preview__author__body__username">
														{'@' +
															auth?.user
																?.username}
													</div>
												</div>
											</div>

											<div className="upload__content__post__preview__content">
												<img
													className="upload__content__post__preview__content-image"
													src={previewImage}
													alt=""
												/>

												<div className="upload__content__post__preview__content-action">
													<div className="upload__content__post__preview__content-action__icon">
														<HeartIcon />
													</div>
													<div className="upload__content__post__preview__content-action__wrapper">
														<div className="upload__content__post__preview__content-action__icon">
															<SendIcon />
														</div>
														<div className="upload__content__post__preview__content-action__icon">
															<CommentIcon />
														</div>
														<div className="upload__content__post__preview__content-action__icon">
															<StarIcon />
														</div>
													</div>
												</div>
											</div>

											<div className="upload__content__post__preview__form">
												<Input
													className="upload__content__post__preview__form__input"
													type="textarea"
													placeholder="Add a caption..."
													onChange={e =>
														setPostCaption(
															e.target.value
														)
													}
													autoFocus
												/>
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
