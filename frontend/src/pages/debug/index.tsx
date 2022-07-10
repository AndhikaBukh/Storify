import React, { useRef, useState } from 'react';
import './index.css';
import { Navbar } from '../../components/navbar/navbar';
import { Input } from '../../components/input/input';
import {
	BackIcon,
	EyeIcon,
	EyeSlashIcon,
	PassIcon,
	PenIcon,
	UserIcon,
} from '../../components/icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/button';
import { Seperator } from '../../components/seperator/seperator';
import { useAuth } from '../../utils/auth';
import axios from 'axios';
import { SignupDebug } from './signup';
import { ComponentsDebug } from './components';
import { LoginDebug } from './login';
import { FormConfig } from '../../utils/form';

export const DebugPage = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	const getRoutesRef = useRef<HTMLInputElement>(null);

	const handleSpecificRoute = () => {
		navigate(`/${getRoutesRef.current?.value}`);
	};

	// --------------------------------------------- Handle Show Password ---------------------------------------------- //
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [passwordIcon, setPasswordicon] = useState<JSX.Element>(
		<EyeSlashIcon />
	);

	const handleShowPassword = () =>
		showPassword !== false
			? setPasswordicon(<EyeSlashIcon />)
			: setPasswordicon(<EyeIcon />);

	// --------------------------------------------- TEST API JSON REQUEST --------------------------------------------- //

	const [jsonData, setJsonData] = useState<any>([]);

	const handleJsonRequest = () => {
		axios
			.get('https://jsonplaceholder.typicode.com/users')
			.then(res => {
				setJsonData(res.data);
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="debug">
			<Navbar type="top" />

			<div className="debug__content">
				<div className="debug__content__container">
					<div className="debug__content__header">
						Go To Specific Routes
					</div>
					<Input
						type="link"
						placeholder="Routes pathname here!"
						refElement={getRoutesRef}
					/>

					<Button type="primary" onClick={handleSpecificRoute}>
						Go To This Routes
					</Button>
				</div>

				<Seperator />

				<div className="debug__content__container">
					<div className="debug__content__header">
						Go To Page Debug
					</div>

					<Button
						type="optional"
						onClick={() => navigate('/signup-debug')}
					>
						Signup Debug
					</Button>
					<Button
						type="optional"
						onClick={() => navigate('/login-debug')}
					>
						Login Debug
					</Button>
				</div>

				<Seperator />

				<div className="debug__content__container">
					<div className="debug__content__header">
						Go To Component Debug
					</div>

					<Link to="/components-debug" className="react-link">
						<Button type="bold">Components Debug</Button>
					</Link>
				</div>
			</div>

			{/* <Navbar type="bottom" /> */}
		</div>
	);
};
