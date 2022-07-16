import React, { createContext, FC, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
	requireLogin: () => void;

	trySignup: (
		_name: string | undefined,
		_email: string | undefined,
		_password: string | undefined,
		_confirmPassword: string | undefined
	) => Promise<unknown>;

	tryLogin: (
		_email: string | undefined,
		_password: string | undefined
	) => Promise<unknown>;

	tryLogout: () => Promise<unknown>;

	requestMe: () => Promise<unknown>;
	requestUser: (_username: string) => Promise<unknown>;
	updateAvatar: (_file: File | string) => Promise<unknown>;

	updateProfile: (
		_name: string | undefined,
		_username: string,
		_bio: string | undefined,

		_avatar: File | string,
		_banner: File | string,

		_gender: string
	) => Promise<unknown>;
}

const authContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const navigate = useNavigate();

	const API = 'localhost:3000/api';

	const config: object = {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('authToken')}`,
		},
	};

	const requireLogin = () => {
		return axios.get(`http://${API}/me`, config).catch(() => {
			navigate('/login');
		});
	};

	const trySignup = async (
		_name: string | undefined,
		_email: string | undefined,
		_password: string | undefined,
		_confirmPassword: string | undefined
	) => {
		const body = {
			username: _name,
			email: _email,
			password: _password,
			confirmPassword: _confirmPassword,
		};

		return new Promise((resolve, reject) => {
			axios
				.post(`http://${API}/auth/register`, body, config)
				.then(res => {
					localStorage.setItem('authToken', res.data.token);
					navigate('/');
					resolve('Successfully registered!');
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const tryLogin = async (
		_email: string | undefined,
		_password: string | undefined
	) => {
		const body = {
			email: _email,
			password: _password,
		};

		return new Promise((resolve, reject) => {
			axios
				.post(`http://${API}/auth/login`, body, config)
				.then(response => {
					localStorage.setItem('authToken', response.data.token);
					navigate('/');
					resolve('Success');
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const tryLogout = () => {
		localStorage.removeItem('authToken');

		return new Promise((resolve, reject) => {
			axios
				.post(`http://${API}/auth/logout`, {}, config)
				.then(() => {
					navigate('/landing');
					resolve('Success');
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const requestMe = async () => {
		return new Promise((resolve, reject) => {
			axios
				.get(`http://${API}/me`, config)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const requestUser = async (_username: string) => {
		return new Promise((resolve, reject) => {
			axios
				.get(`http://${API}/user/${_username}`, config)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const updateAvatar = async (_avatar: File | string) => {
		return new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('avatar', _avatar);
			axios
				.put(`http://${API}/me`, data, {
					headers: {
						// 'Content-Type': 'multipart/form-data',
						authorization: `Bearer ${localStorage.getItem(
							'authToken'
						)}`,
					},
				})
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const updateProfile = async (
		_name: string | undefined,
		_username: string,
		_bio: string | undefined,

		_avatar: File | string,
		_banner: File | string,

		_gender: string
	) => {
		return new Promise((resolve, reject) => {
			axios
				.put(`http://${API}/me`, { username: _username }, config)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	return (
		<authContext.Provider
			value={{
				requireLogin,

				trySignup,
				tryLogin,
				tryLogout,

				requestMe,
				requestUser,

				updateAvatar,
				updateProfile,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(authContext);
};
