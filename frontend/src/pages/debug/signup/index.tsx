import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/button/button';
import { PenIcon, UserIcon, PassIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import '../index.css';

export const SignupDebug = () => {
	const auth = useAuth();
	const navigate = useNavigate();

	// ----------------------------------------------- Handle Signup Auth ---------------------------------------------- //

	const [signupUsername, setSignupUsername] = useState<string>('');
	const [signupEmail, setSignupEmail] = useState<string>('');
	const [signupPassword, setSignupPassword] = useState<string>('');
	const [signupConfirmPassword, setSignupConfirmPassword] =
		useState<string>('');

	const [signupStatus, setSignupStatus] = useState<string>('');

	const takeSignupEmailInput = useRef<HTMLInputElement>(null);
	const takeSignupUsernameInput = useRef<HTMLInputElement>(null);
	const takeSignupPasswordInput = useRef<HTMLInputElement>(null);
	const takeSignupConfirmPasswordInput = useRef<HTMLInputElement>(null);

	const handleSignup = () => {
		auth?.signupHandler(
			takeSignupUsernameInput.current?.value,
			takeSignupEmailInput.current?.value,
			takeSignupPasswordInput.current?.value,
			takeSignupConfirmPasswordInput.current?.value
		);
	};

	return (
		<div className="debug">
			<Navbar type="top" />

			<div className="debug__content">
				<div className="debug__content__header">
					Sign Up Auth System - Debug
				</div>

				{/* <Input
				icon={<PenIcon color="#776bf8" />}
				placeholder="Username"
				type="email"
				onChange={e => setSignupUsername(e.target.value)}
				refElement={takeSignupUsernameInput}
			/>
			<Input
				icon={<UserIcon color="#776bf8" />}
				placeholder="Email Address"
				type="email"
				onChange={e => setSignupEmail(e.target.value)}
				refElement={takeSignupEmailInput}
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
				placeholder="Create Password"
				type={showPassword !== true ? 'password' : 'text'}
				onChange={e => setSignupPassword(e.target.value)}
				refElement={takeSignupPasswordInput}
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
				placeholder="Confirm Password"
				type={showPassword !== true ? 'password' : 'text'}
				onChange={e => setSignupConfirmPassword(e.target.value)}
				refElement={takeSignupConfirmPasswordInput}
			/> */}

				<div className="debug__content__login-data">
					<div className="debug__content__login-data__username">
						Username <br />
						componentData : {signupUsername} <br />
						elementData : {takeSignupUsernameInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__username">
						Email Address <br />
						componentData : {signupEmail} <br />
						elementData : {takeSignupEmailInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__password">
						Password <br />
						componentData : {signupPassword} <br />
						elementData : {takeSignupPasswordInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__confirm-password">
						Confirm Password <br />
						componentData : {signupConfirmPassword} <br />
						elementData :{' '}
						{takeSignupConfirmPasswordInput?.current?.value}
					</div>

					<br />

					<div className="debug__content__login-data__login-status">
						Login Status : {signupStatus}
					</div>
				</div>

				<Button type="primary" onClick={handleSignup}>
					Sign Up
				</Button>
			</div>
		</div>
	);
};
