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
import { PopUp } from '../../../components/popup/popup';
import { useAuth } from '../../../utils/auth';
import { useForm } from '../../../utils/form';
import './index.css';

const handleIncorrect = (
	_setter: React.Dispatch<React.SetStateAction<boolean>>,
	_element: any = null
) => {
	_setter(true);
	_element?.focus();
};

export const LoginPage = () => {
	const navigate = useNavigate();
	const auth = useAuth();
	const form = useForm();

	const [showAlert, setShowAlert] = useState(false);
	const [alertContent, setAlertContent] = useState('');

	// Handle user login
	const takeEmailInput = useRef<HTMLInputElement>(null);
	const [highlightEmail, setHighlightEmail] = useState(false);
	const takePasswordInput = useRef<HTMLInputElement>(null);
	const [highlightPassword, setHighlightPassword] = useState(false);

	const handleLogin = () => {
		takePasswordInput.current?.value === ''
			? handleIncorrect(setHighlightPassword, takePasswordInput.current)
			: null;
		takeEmailInput.current?.value === ''
			? handleIncorrect(setHighlightEmail, takeEmailInput.current)
			: null;

		const handleEmail = takeEmailInput.current?.value.toLowerCase();
		const handlePassword = takePasswordInput.current?.value;

		auth?.tryLogin(handleEmail, handlePassword).catch(error => {
			setAlertContent(error.response?.data?.error);
			handleIncorrect(setHighlightPassword);
			handleIncorrect(setHighlightEmail);
			setShowAlert(true);
		});
	};

	useEffect(() => {
		document.title = 'Project Sylly - Login Page';
	}, []);

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

				<div className="login__header">
					<PopUp
						show={showAlert}
						variant="alert"
						type="error"
						onClose={() => setShowAlert(false)}
						header="Login Failed"
						content={alertContent}
					/>
				</div>

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
						refElement={takeEmailInput}
						isHighlighted={highlightEmail}
					/>
					<Input
						icon={<PassIcon color="#776bf8" />}
						eventIcon={form?.passwordIcon}
						handleEventIcon={form?.showPassword}
						placeholder="Password"
						type={form?.passwordType}
						refElement={takePasswordInput}
						isHighlighted={highlightPassword}
					/>

					<div className="login__container__forget-password">
						<Link
							className="login__container__forget-password__link"
							to="/accounts/password/forgot"
						>
							Forgot Your Password?
						</Link>
					</div>
				</div>

				<div className="login__button-container">
					<Button type="submit" onClick={handleLogin}>
						Log In
					</Button>

					<Link to="/signup" className="react-link">
						<Button variant="optional">
							Don’t have account? Sign Up
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};
