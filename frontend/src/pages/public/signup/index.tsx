/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	UserIcon,
	PassIcon,
	PenIcon,
	InfoCircleIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { PopUp } from '../../../components/popup/popup';
import { useAuth } from '../../../utils/auth';
import { useForm } from '../../../utils/form';
import './index.css';

const _errorMessage = [
	'Username must be at least 5 characters',
	'Please provide a valid email',
	'Password must be at least 5 characters',
	'Password and Confirm Password must be same',
];

const handleIncorrect = (
	_setter: any,
	_element: any = null,
	_disable = false
) => {
	if (_disable) {
		_setter(false);
		return;
	} else {
		_setter(true);
		_element.current?.focus();
	}
};

export const SignupPage = () => {
	const auth = useAuth();
	const form = useForm();
	const navigate = useNavigate();

	const [showAlert, setShowAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');

	const takeUsername = useRef<HTMLInputElement>(null);
	const [hightlightUsername, setHightlightUsername] = useState(false);
	const takeEmail = useRef<HTMLInputElement>(null);
	const [hightlightEmail, setHightlightEmail] = useState(false);
	const takePassword = useRef<HTMLInputElement>(null);
	const [hightlightPassword, setHightlightPassword] = useState(false);
	const takeConfirmPassword = useRef<HTMLInputElement>(null);
	const [hightlightConfirmPassword, setHightlightConfirmPassword] =
		useState(false);

	const handleHighlighting = (_error: unknown | string) => {
		if (takeUsername.current?.value === '' || _error === 'USERNAME') {
			handleIncorrect(setHightlightUsername, takeUsername);
			return;
		} else setHightlightUsername(false);
		if (takeEmail.current?.value === '' || _error === 'EMAIL') {
			handleIncorrect(setHightlightEmail, takeEmail);
			return;
		} else setHightlightEmail(false);
		if (takePassword.current?.value === '' || _error === 'PASSWORD') {
			handleIncorrect(setHightlightPassword, takePassword);
			return;
		} else setHightlightPassword(false);
		if (
			takeConfirmPassword.current?.value === '' ||
			_error === 'PASSWORDCONFIRM'
		) {
			handleIncorrect(setHightlightConfirmPassword, takeConfirmPassword);
			return;
		} else setHightlightConfirmPassword(false);

		if (_error === 'PASSWORDMATCH') {
			handleIncorrect(setHightlightPassword, takePassword);
			handleIncorrect(setHightlightConfirmPassword);
			return;
		} else {
			setHightlightPassword(false);
			setHightlightConfirmPassword(false);
		}
	};

	const handleSignup = () => {
		auth?.trySignup(
			takeUsername.current?.value.toLowerCase(),
			takeEmail.current?.value.toLowerCase(),
			takePassword.current?.value,
			takeConfirmPassword.current?.value
		).catch(error => {
			setAlertContent(error.response?.data?.error.split('&')[1]);
			setShowAlert(true);
			handleHighlighting(error.response?.data?.error.split('&')[0]);
		});
	};

	useEffect(() => {
		document.title = 'Project Sylly - Signup Page';
	}, []);

	return (
		<div className="signup">
			<div className="signup__wrapper">
				<Navbar
					type="page"
					pageNavbarAttributes={{
						pageTitle: 'Sign Up',
						handlePageIconLeft: () => {
							navigate('/login');
						},
						pageIconRight: <InfoCircleIcon />,
					}}
				/>

				<div className="signup__header">
					<PopUp
						show={showAlert}
						variant="alert"
						type="error"
						onClose={() => setShowAlert(false)}
						header="Error"
						content={alertContent}
					/>
				</div>

				<div className="signup__input-container">
					<header className="signup__input-header">
						<h1 className="signup__input-header-title">
							Create New Account
						</h1>
					</header>

					<Input
						icon={<PenIcon color="#776bf8" />}
						placeholder="Username"
						refElement={takeUsername}
						isHighlighted={hightlightUsername}
					/>
					<Input
						icon={<UserIcon color="#776bf8" />}
						placeholder="Email Address"
						refElement={takeEmail}
						isHighlighted={hightlightEmail}
					/>
					<Input
						icon={<PassIcon color="#776bf8" />}
						eventIcon={form?.passwordIcon}
						handleEventIcon={form?.showPassword}
						placeholder="Password"
						type={form?.passwordType}
						refElement={takePassword}
						isHighlighted={hightlightPassword}
					/>
					<Input
						icon={<PassIcon color="#776bf8" />}
						eventIcon={form?.passwordIcon}
						handleEventIcon={form?.showPassword}
						placeholder="Confirm Password"
						type={form?.passwordType}
						refElement={takeConfirmPassword}
						isHighlighted={hightlightConfirmPassword}
					/>
				</div>

				<div className="signup__button-container">
					<Button type="submit" onClick={handleSignup}>
						Sign Up
					</Button>
				</div>
			</div>
		</div>
	);
};
