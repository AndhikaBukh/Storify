import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import {
	UserIcon,
	PassIcon,
	EyeIcon,
	EyeSlashIcon,
} from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const LoginPage = () => {
	const navigate = useNavigate();
	const auth = useAuth();

	// Handle user login
	const takeUsernameInput = useRef<HTMLInputElement>(null);

	const handleLogin = () => {
		auth?.login(takeUsernameInput.current?.value);

		console.log(`elementData : ${takeUsernameInput.current?.value}`);
		console.log(`componentData : ${takeUsernameInput.current?.value}`);
		console.log(`authData : ${auth?.userData?.validName}`);

		if (takeUsernameInput.current?.value !== '') {
			navigate(`/${takeUsernameInput.current?.value}`);
		} else {
			console.log('Login failed - Input Value is Undefined or Empty');
		}
	};

	// Handle show password
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
			<Navbar
				type="page"
				pageNavbarAttributes={{
					pageTitle: 'Login',
					handlePageIconLeft: () => {
						navigate('/');
					},
				}}
			/>

			<div className="login__container">
				<header className="login__container__header">
					<h1 className="login__container__header-title">
						Hi There! <br />
						Welcome Back.
					</h1>
				</header>

				<Input
					icon={<UserIcon color="#776bf8" />}
					placeholder="Email Address"
					type="email"
					refElement={takeUsernameInput}
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

				<div className="login__container__forget-password">
					<Link
						className="login__container__forget-password__link"
						to="/forgot-password"
					>
						Forgot Your Password?
					</Link>
				</div>
			</div>

			<div className="login__button-container">
				<Button onClick={handleLogin}>Log In</Button>

				<Link to="/signup" className="react-link">
					<Button type="optional">Don’t have account? Sign Up</Button>
				</Link>
			</div>
		</div>
	);
};
