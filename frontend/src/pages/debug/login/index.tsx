import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import { UserIcon, PassIcon, BackIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import { useForm } from '../../../utils/form';
import '../index.css';

export const LoginDebug = () => {
	const auth = useAuth();
	const form = useForm();

	// ----------------------------------------------- Handle Login Auth ----------------------------------------------- //
	const [loginUsername, setLoginUsername] = useState<string>('');
	const [loginPassword, setPassword] = useState<string>('');

	const [loginStatus, setLoginStatus] = useState<string>('');
	const [AuthStatus, setAuthStatus] = useState<string>('');

	const takeLoginUsernameInput = useRef<HTMLInputElement>(null);
	const takeLoginPasswordInput = useRef<HTMLInputElement>(null);

	const handleLogin = () => {
		// TO-DO : Make warning popup
		takeLoginUsernameInput.current?.value === ''
			? setLoginStatus('Username field is Empty!')
			: takeLoginPasswordInput.current?.value === ''
			? setLoginStatus('Password field is Empty!')
			: setLoginStatus('Form is Filled!');

		// TESTING BEWARE : This is for testing purpose only
		auth?.loginHandler(
			takeLoginUsernameInput.current?.value,
			takeLoginPasswordInput.current?.value
		);
	};

	return (
		<div className="debug">
			<Navbar type="top" />

			<div className="debug__content">
				<div className="debug__content__header">
					Login Auth System - Debug
				</div>

				<Input
					icon={<UserIcon color="#776bf8" />}
					placeholder="Username"
					type="username"
					onChange={e => setLoginUsername(e.target.value)}
					refElement={takeLoginUsernameInput}
				/>
				<Input
					icon={<PassIcon color="#776bf8" />}
					eventIcon={form?.passwordIcon}
					handleEventIcon={() => form?.showPassword()}
					placeholder="Password"
					type={form?.passwordType}
					onChange={e => setPassword(e.target.value)}
					refElement={takeLoginPasswordInput}
				/>

				<div className="debug__content__login-data">
					<div className="debug__content__login-data__username">
						Username <br />
						componentData : {loginUsername} <br />
						elementData : {takeLoginUsernameInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__password">
						Password <br />
						componentData : {loginPassword} <br />
						elementData : {takeLoginPasswordInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__login-status">
						Form Status : {loginStatus} <br />
						Auth Status : {AuthStatus}
					</div>
				</div>

				<Button type="primary" onClick={handleLogin}>
					Login
				</Button>
			</div>
		</div>
	);
};
