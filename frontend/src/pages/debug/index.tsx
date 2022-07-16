import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { Navbar } from '../../components/navbar/navbar';
import { Input } from '../../components/input/input';
import {
	BackIcon,
	ExclamationCircleFilledIcon,
	EyeIcon,
	EyeSlashIcon,
	PassIcon,
	PenIcon,
	UserIcon,
} from '../../components/icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { Seperator } from '../../components/seperator/seperator';
import { useAuth } from '../../utils/auth';
import axios from 'axios';
import { PopUp } from '../../components/popup/popup';

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

	// Debug PopUp Component
	const [showAlertError, setShowAlertError] = useState(true);
	const [showAlertWarning, setShowAlertWarning] = useState(true);
	const [showAlertInfo, setShowAlertInfo] = useState(true);
	const [showAlertSuccess, setShowAlertSuccess] = useState(true);

	// Debug Upload
	const [fileUpload, setFileUpload] = useState<File | string>('');
	const refUpload = useRef<HTMLInputElement>(null);

	const handleUpload = () => {
		if (refUpload.current?.files) {
			setFileUpload(refUpload.current?.files[0]);
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
					<input
						type="file"
						name="avatar"
						id=""
						ref={refUpload}
						accept="image/png, image/jpeg"
					/>

					<Button
						variant="primary"
						type="submit"
						onClick={() => {
							console.log(fileUpload);
							handleUpload();
							auth?.updateAvatar(fileUpload);
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

				{/* <div className="debug__content__container">
					<div className="debug__content__header">
						Debug PopUp Component
					</div>
					<Button
						variant="primary"
						onClick={() => setShowAlertError(true)}
					>
						Show PopUp Error
					</Button>

					<Button
						variant="primary"
						onClick={() => setShowAlertWarning(true)}
					>
						Show PopUp Warning
					</Button>

					<Button
						variant="primary"
						onClick={() => setShowAlertInfo(true)}
					>
						Show PopUp Info
					</Button>

					<Button
						variant="primary"
						onClick={() => setShowAlertSuccess(true)}
					>
						Show PopUp Success
					</Button>

					<Seperator />

					<PopUp
						variant="alert"
						type="error"
						show={showAlertError}
						onClose={() => setShowAlertError(false)}
						header="Error"
						content="This is an error message!"
					/>

					<PopUp
						variant="alert"
						type="warning"
						show={showAlertWarning}
						onClose={() => setShowAlertWarning(false)}
						header="Warning"
						content="This is an warning message!"
					/>

					<PopUp
						variant="alert"
						type="info"
						show={showAlertInfo}
						onClose={() => setShowAlertInfo(false)}
						header="Info"
						content="This is a info message!"
					/>

					<PopUp
						variant="alert"
						type="success"
						show={showAlertSuccess}
						onClose={() => setShowAlertSuccess(false)}
						header="Success"
						content="This is a success message!"
					/>
				</div> */}
			</div>

			{/* <Navbar type="bottom" /> */}
		</div>
	);
};
