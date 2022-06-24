import React, { useState } from 'react';
import { Button } from '../components/button/button';
import { UserIcon, PassIcon } from '../components/icons';
import { Input } from '../components/input/input';
import { Seperator } from '../components/seperator/seperator';
import './index.css';

export const Login = () => {
	const [showPassword, setShowPassword] = useState<boolean>();

	return (
		<div className="login">
			<header className="login__header">
				<img className="login__header-icon" src="/logo.png" alt="" />

				<h1 className="login__header-title">
					Hi There! <br />
					Welcome Back.
				</h1>
			</header>

			<div className="login__input-container">
				<Input
					show
					icon={<UserIcon color="#776bf8" />}
					placeholder="Username"
				/>
				<Input
					show
					icon={<PassIcon color="#776bf8" />}
					eventIcon={<PassIcon color="#776bf8" />}
					placeholder="Password"
					type={showPassword !== true ? 'password' : 'text'}
				/>

				<div className="login__input-seperator">
					<Seperator show />
					Or
					<Seperator show />
				</div>

				<Button show type="bold">
					Continue With Google
				</Button>
			</div>

			<div className="login__button-container">
				<Button show>Log In</Button>
				<Button show type="optional">
					Don’t have account? Create One!
				</Button>
			</div>
		</div>
	);
};
