import React, { createContext, FC, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface userInterface {
	name: string;
	username: string;
	email: string;
	bio: string;
	avatar: string;
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

	updateAvatar: (_file: File) => Promise<unknown>;
	updateBanner: (_file: File) => Promise<unknown>;

	updateProfile: (
		_name?: string | undefined,
		_bio?: string | undefined,

		_gender?: string | undefined
	) => Promise<unknown>;

	postCreate: (_image: File, _caption: string) => Promise<unknown>;

	// BELOW THIS LIES TESTING FEATURE
	requestPost: () => Promise<unknown>;
}

const authContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

/**
 * authProvider
 *
 * See Function {@link authProvider}
 */
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<userInterface>();

	const navigate = useNavigate();

	// const API = 'http://192.168.100.10:3000/api';
	// const API = 'http://192.168.43.51:3000/api';
	const API = 'http://localhost:3000/api';

	const config: object = {
		headers: {
			'Content-Type': 'application/json',
			authorization: `Bearer ${localStorage.getItem('authToken')}`,
		},
	};

	const assignUser = async () => {
		if (!localStorage.getItem('authToken')) return;

		return await new Promise((resolve, reject) => {
			axios
				.get(`${API}/me`, config)
				.then(res => {
					resolve(res);
					setUser({
						username: res.data?.user?.username,
						name: res.data?.user?.name,
						email: res.data?.user?.email,
						bio: res.data?.user?.bio,
						avatar: res.data?.user?.avatar,
					} as userInterface);
				})
				.catch(error => {
					reject(error);
					if (localStorage.getItem('authToken')) {
						navigate('/login');
					}
				});
		});
	};

	const requireLogin = async () => {
		if (localStorage.getItem('authToken')) return;

		return await new Promise((resolve, reject) => {
			axios.get(`${API}/me`, config).catch(() => {
				navigate('/login');
			});
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

		return await new Promise((resolve, reject) => {
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

		return await new Promise((resolve, reject) => {
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

	const tryLogout = async () => {
		localStorage.removeItem('authToken');

		return await new Promise((resolve, reject) => {
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

		return await new Promise(resolve => {
			axios
				.get(`${API}/me`, config)
				.then(res => {
					resolve(res);
				})
				.catch(() => {
					navigate('/login');
				});
		});
	};

	const requestUser = async (_username: string) => {
		return await new Promise((resolve, reject) => {
			axios
				.post(
					`${API}/user/${_username}`,
					{
						loginUser:
							user?.username === undefined ? '' : user.username,
					},
					config
				)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const requestFollow = async (_username: string) => {
		return await new Promise(() => {
			axios.post(`${API}/user/${_username}`, config).then(res => {
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
		return await new Promise(() => {
			axios.post(`${API}/user/${_username}`, config).then(res => {
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

	const requestPost = async () => {
		return await new Promise((resolve, reject) => {
			axios
				.get(`${API}/post`, config)
				.then(res => {
					resolve(res);
				})
				.catch(error => {
					reject(error);
				});
		});
	};

	const updateAvatar = async (_avatar: File) => {
		return await new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('avatar', _avatar);
			axios
				.put(`${API}/me`, data, {
					headers: {
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

	const updateBanner = async (_banner: File) => {
		return await new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('banner', _banner);
			axios
				.put(`${API}/me`, data, {
					headers: {
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

		_gender: string | undefined
	) => {
		const body = {
			name: _name,
			bio: _bio,

			gender: _gender,
		};

		return await new Promise((resolve, reject) => {
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

	const postCreate = async (_image: File, _caption: string) => {
		return await new Promise((resolve, reject) => {
			const data = new FormData();
			data.append('caption', _caption);
			data.append('images', _image);

			axios
				.post(`${API}/post`, data, {
					headers: {
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

	const postRequest = async (_id: string) => {
		return await new Promise((resolve, reject) => {
			axios
				.get(`${API}/post/${_id}`, config)
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
				updateBanner,
				updateProfile,

				postCreate,

				// BELOW THIS LIES TESTING FEATURE
				requestPost,
			}}
		>
			{children}
		</authContext.Provider>
	);
};

/**
 * @description - Returns the current user from the context
 *
 * See Function {@link useAuth}
 */
export const useAuth = () => {
	return useContext(authContext);
};
