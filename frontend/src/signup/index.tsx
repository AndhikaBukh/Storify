import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button/button';
import {
	UserIcon,
	PassIcon,
	EyeIcon,
	EyeSlashIcon,
	PenIcon,
	InfoIcon,
} from '../components/icons';
import { Input } from '../components/input/input';
import { Navbar } from '../components/navbar/navbar';
import { Seperator } from '../components/seperator/seperator';
import './index.css';

export const Signup = () => {
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
			<Navbar
				type="page"
				pageTitle="Sign Up"
				handlePageIconLeft={() => {
					navigate('../login');
				}}
				pageIconRight={<InfoIcon />}
			/>

			<div className="signup__input-container">
				<header className="signup__input-header">
					<h1 className="signup__input-header-title">
						Create New Account
					</h1>
				</header>

				<Input
					show
					icon={<PenIcon color="#776bf8" />}
					placeholder="Username"
					handleInputValue={ele => console.log(ele.value)}
				/>
				<Input
					show
					icon={<UserIcon color="#776bf8" />}
					placeholder="Email Address"
					handleInputValue={ele => console.log(ele.value)}
				/>
				<Input
					show
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
					handleInputValue={ele => console.log(ele.value)}
				/>
				<Input
					show
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
					handleInputValue={ele => console.log(ele.value)}
				/>

				<Button show>Sign Up</Button>
			</div>

			<div className="signup__button-container">
				<div className="signup__button-seperator">
					<Seperator show />
					Or
					<Seperator show />
				</div>

				<Button show type="bold">
					Sign Up With Google
				</Button>
			</div>
		</div>
	);
};
