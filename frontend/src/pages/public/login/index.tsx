import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	UserIcon,
	PassIcon,
	EyeIcon,
	EyeSlashIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Seperator } from '../../../components/seperator/seperator';
import './index.css';

export const LoginPage = () => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordIcon, setPasswordicon] = useState<JSX.Element>(
		<EyeSlashIcon />
	);

	const handleShowPassword = () =>
		showPassword !== false
			? setPasswordicon(<EyeSlashIcon />)
			: setPasswordicon(<EyeIcon />);

	return (
		<div className="login">
			<header className="login__header">
				<h1 className="login__header-title">
					Hi There! <br />
					Welcome Back.
				</h1>
			</header>

			<div className="login__input-container">
				<Input
					show
					icon={<UserIcon color="#776bf8" />}
					placeholder="Email Address"
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
				/>

				<div className="login__input-seperator">
					<Seperator />
					Or
					<Seperator />
				</div>

				<Link to="/home" className="react-link">
					<Button type="bold">Continue With Google</Button>
				</Link>
			</div>

			<div className="login__button-container">
				<Link to="/home" className="react-link">
					<Button>Log In</Button>
				</Link>

				<Link to="/signup" className="react-link">
					<Button type="optional">Don’t have account? Sign Up</Button>
				</Link>
			</div>
		</div>
	);
};
