import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	PenIcon,
	UserIcon,
	PassIcon,
	EyeIcon,
	EyeSlashIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { Seperator } from '../../../components/seperator/seperator';

export const ResetPasswordPage = () => {
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
		<div className="reset-password">
			<Navbar
				type="page"
				pageNavbarAttributes={{
					pageTitle: 'Reset Password',
					handlePageIconLeft: () => {
						navigate('/login');
					},
				}}
			/>

			<div className="reset-password__input-container">
				<header className="reset-password__input-header">
					<h1 className="reset-password__input-header-title">
						Create New Password
					</h1>
				</header>

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

			<div className="reset-password__button-container">
				<Link to="/home" className="react-link">
					<Button type="submit" variant="bold">
						Submit
					</Button>
				</Link>
			</div>
		</div>
	);
};
