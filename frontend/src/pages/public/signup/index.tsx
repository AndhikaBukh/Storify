import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	UserIcon,
	PassIcon,
	EyeIcon,
	EyeSlashIcon,
	PenIcon,
	InfoCircleIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';
import './index.css';

export const SignupPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordIcon, setPasswordicon] = useState<JSX.Element>(
		<EyeSlashIcon />
	);

	const handleShowPassword = () =>
		showPassword !== false
			? setPasswordicon(<EyeSlashIcon />)
			: setPasswordicon(<EyeIcon />);

	const navigate = useNavigate();

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

				<div className="signup__input-container">
					<header className="signup__input-header">
						<h1 className="signup__input-header-title">
							Create New Account
						</h1>
					</header>

					<Input
						icon={<PenIcon color="#776bf8" />}
						placeholder="Username"
					/>
					<Input
						icon={<UserIcon color="#776bf8" />}
						placeholder="Email Address"
					/>
					<Input
						icon={<PassIcon color="#776bf8" />}
						eventIcon={passwordIcon}
						handleEventIcon={() => {
							showPassword !== false
								? setShowPassword(false)
								: setShowPassword(true);
							handleShowPassword();
						}}
						placeholder="Password"
						type={showPassword !== true ? 'password' : 'text'}
					/>
					<Input
						icon={<PassIcon color="#776bf8" />}
						eventIcon={passwordIcon}
						handleEventIcon={() => {
							showPassword !== false
								? setShowPassword(false)
								: setShowPassword(true);
							handleShowPassword();
						}}
						placeholder="Password"
						type={showPassword !== true ? 'password' : 'text'}
					/>
				</div>

				<div className="signup__button-container">
					<Link to="/home" className="react-link">
						<Button>Sign Up</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
