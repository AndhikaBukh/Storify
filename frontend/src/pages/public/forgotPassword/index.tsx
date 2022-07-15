import React from 'react';
import './index.css';
import { Navbar } from '../../../components/navbar/navbar';
import { QuestionCircleIcon, UserIcon } from '../../../components/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '../../../components/input/input';
import { Button } from '../../../components/button/button';

export const ForgotPasswordPage = () => {
	const navigate = useNavigate();

	return (
		<div className="forgot-password">
			<Navbar
				type="page"
				pageNavbarAttributes={{
					pageTitle: 'Forgot Password',
					handlePageIconLeft: () => navigate('/login'),
					pageIconRight: <QuestionCircleIcon />,
					handlePageIconRight: () => {
						navigate('/help');
					},
				}}
			/>

			<div className="forgot-password__container">
				<div className="forgot-password__container__header">
					<div className="forgot-password__container__header__title">
						Please Enter Email Address
					</div>
					<div className="forgot-password__container__header__subtitle">
						You&apos;ll receive Link via Email and reset your
						password
					</div>
				</div>

				<div className="forgot-password__container__form">
					<Input
						type="email"
						placeholder="Email"
						icon={<UserIcon color="#776BF8" />}
					/>
				</div>

				<div className="forgot-password__container__help">
					Forget Email Address?
					<Link
						className="forgot-password__container__help__link"
						to="/help"
					>
						Help Center
					</Link>
				</div>
			</div>

			<div className="forgot-password__button">
				<Button type="submit">Send Verivication Code</Button>
			</div>
		</div>
	);
};
