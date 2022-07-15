import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
	ArrowRightIcon,
	BackIcon,
	CameraIcon,
	ChevronCircleDownIcon,
} from '../../../components/icons';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const UploadPage = () => {
	const auth = useAuth();

	const getInputElement = useRef<HTMLInputElement>(null);
	const [previewImage, setPreviewImage] = useState<string | undefined>(
		undefined
	);

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Upload';
	}, []);

	return (
		<div className="upload">
			<Navbar
				type="top"
				className="upload__top-navbar"
				topNavbarAttributes={{
					leftContent: (
						<>
							<Link to="/" className="navbar__button">
								<BackIcon />
							</Link>
							New Post
						</>
					),
					rightContent: (
						<button className="navbar__button">
							<ArrowRightIcon color="#295adb" />
						</button>
					),
				}}
			/>

			<div className="upload__content">
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
							<div className="upload__content__input__header__icon">
								<ChevronCircleDownIcon />
							</div>
						</button>

						<div className="upload__content__input__header__icon upload__content__input__header__icon--button">
							<CameraIcon />
						</div>
					</div>

					<div className="upload__content__input__body">
						<input
							type="file"
							className="upload__content__input__body__input"
							accept="image/*"
							onChange={e => {
								e.target.files &&
									e.target.files[0] &&
									setPreviewImage(
										URL.createObjectURL(e.target.files[0])
									);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
