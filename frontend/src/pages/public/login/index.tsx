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
import { useForm } from '../../../utils/form';
import './index.css';

export const LoginPage = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const form = useForm();

	// Handle user login
	const takeUsernameInput = useRef<HTMLInputElement>(null);

	return (
		<div className="login">
			<div className="login__wrapper">
				<Navbar
					type="page"
					pageNavbarAttributes={{
						pageTitle: 'Login',
						handlePageIconLeft: () => {
							navigate('/landing');
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
						eventIcon={form?.passwordIcon}
						handleEventIcon={() => form?.showPassword}
						placeholder="Password"
						type={form?.passwordType}
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
					<Button>Log In</Button>

					<Link to="/signup" className="react-link">
						<Button type="optional">
							Don’t have account? Sign Up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
