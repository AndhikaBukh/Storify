import React, { useEffect, useRef } from 'react';
import './index.css';
import { Navbar } from '../../components/navbar/navbar';
import { Input } from '../../components/input/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { Seperator } from '../../components/seperator/seperator';
import { useAuth } from '../../utils/auth';

export const DebugPage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const getRoutesRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		document.title = 'Project Sylly - Debug';
	}, []);

	const handleSpecificRoute = () => {
		navigate(`/${getRoutesRef.current?.value.toLowerCase()}`);
	};

	// Debug Update Profile - Upload Avatar
	const refUploadAvatar = useRef<HTMLInputElement>(null);

	const handleUploadAvatar = () => {
		if (refUploadAvatar.current?.files) {
			auth?.updateAvatar(refUploadAvatar.current?.files[0]);
		}
	};

	// Debug Update Profile - Upload Avatar
	const refUploadBanner = useRef<HTMLInputElement>(null);

	const handleUploadBanner = () => {
		if (refUploadBanner.current?.files) {
			auth?.updateBanner(refUploadBanner.current?.files[0]);
		}
	};

	return (
		<div className="debug">
			<Navbar type="top" />

			<div className="debug__content">
				<div className="debug__content__container">
					<div className="debug__content__header">
						Go To Specific Routes
					</div>
					<Input
						type="link"
						placeholder="Routes pathname here!"
						refElement={getRoutesRef}
					/>

					<Button
						variant="primary"
						type="submit"
						onClick={handleSpecificRoute}
					>
						Go To This Routes
					</Button>
				</div>

				<Seperator />

				<div className="debug__content__container">
					<div className="debug__content__header">
						Debug Update Profile - Upload Avatar
					</div>

					<input
						type="file"
						name="avatar"
						id=""
						ref={refUploadAvatar}
						accept="image/png, image/jpeg"
					/>

					<Button
						variant="primary"
						type="submit"
						onClick={() => {
							handleUploadAvatar();
						}}
					>
						Upload File
					</Button>
				</div>

				<Seperator />

				<div className="debug__content__container">
					<div className="debug__content__header">
						Debug Update Profile - Upload Banner
					</div>

					<input
						type="file"
						name="avatar"
						id=""
						ref={refUploadBanner}
						accept="image/png, image/jpeg"
					/>

					<Button
						variant="primary"
						type="submit"
						onClick={() => {
							handleUploadBanner();
						}}
					>
						Upload File
					</Button>
				</div>

				<Seperator />

				<div className="debug__content__container">
					<Button
						variant="primary"
						type="submit"
						onClick={() => {
							auth?.tryLogout();
						}}
					>
						Logout Debug
					</Button>
				</div>
			</div>

			{/* <Navbar type="bottom" /> */}
		</div>
	);
};
