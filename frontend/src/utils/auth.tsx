import React, { createContext, FC, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface userInterface {
	name: string;
	username: string;
	email: string;
	bio: string;
}

interface IAuthContext {
	user: userInterface | undefined;
	assignUser: () => void;
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
	requestFollow: (_username: string) => Promise<unknown>;
	requestUnfollow: (_username: string) => Promise<unknown>;

	updateAvatar: (_file: File | string) => Promise<unknown>;
	updateProfile: (
		_name: string | undefined,
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
	const [user, setUser] = useState<userInterface>();

	const navigate = useNavigate();

	const API = 'http://localhost:3000/api';

	const config: object = {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('authToken')}`,
		},
	};

	const assignUser = async () => {
		if (!localStorage.getItem('authToken')) return;

		return await axios.get(`${API}/me`, config).then(res => {
			setUser(res.data.user);
		});
	};

	const requireLogin = async () => {
		return axios.get(`${API}/me`, config).catch(() => {
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
				.post(`${API}/auth/register`, body, config)
				.then(res => {
					localStorage.setItem('authToken', res.data.token);
					setUser(res.data.user);
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
				.post(`${API}/auth/login`, body, config)
				.then(response => {
					localStorage.setItem('authToken', response.data.token);
					setUser(response.data.user);
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
				.post(`${API}/auth/logout`, {}, config)
				.then(() => {
					setUser(undefined);
					navigate('/landing');
					resolve('Success');
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const requestMe = async () => {
		if (!localStorage.getItem('authToken')) return;

		return new Promise((resolve, reject) => {
			axios
				.get(`${API}/me`, config)
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
				.get(`${API}/user/${_username}`, config)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const requestFollow = async (_username: string) => {
		return new Promise(() => {
			axios.get(`${API}/user/${_username}`, config).then(res => {
				const uid = res?.data?.user?._id;

				if (uid) {
					axios.put(
						`${API}/user/${uid}/follow`,
						res?.data?.user,
						config
					);
				}
			});
		});
	};

	const requestUnfollow = async (_username: string) => {
		return new Promise(() => {
			axios.get(`${API}/user/${_username}`, config).then(res => {
				const uid = res?.data?.user?._id;

				if (uid) {
					axios.put(
						`${API}/user/${uid}/unfollow`,
						res?.data?.user,
						config
					);
				}
			});
		});
	};

	const updateAvatar = async (_avatar: File | string) => {
		return new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('avatar', _avatar);
			axios
				.put(`${API}/me`, data, {
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
		_bio: string | undefined,

		_avatar: File | string,
		_banner: File | string,

		_gender: string
	) => {
		const body = {
			name: _name,
			bio: _bio,

			avatar: _avatar,
			banner: _banner,

			gender: _gender,
		};

		return new Promise((resolve, reject) => {
			axios
				.put(`${API}/me`, body, config)
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
				user,
				assignUser,
				requireLogin,

				trySignup,
				tryLogin,
				tryLogout,

				requestMe,
				requestUser,
				requestFollow,
				requestUnfollow,

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
