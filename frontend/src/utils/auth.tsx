import { createContext, FC, useContext, useState } from 'react';

interface IAuthContext {
	// login: (user: any) => void;
	// logout: () => void;

	userData: userDataProps;

	signupHandler: (
		_username: string | undefined,
		_email: string | undefined,
		_password: string | undefined,
		_confirmPassword: string | undefined
	) => void;

	loginHandler: (
		_username: string | undefined,
		_password: string | undefined
	) => void;
}

interface userDataProps {
	username?: string;
	validName?: string;
	bio?: string;

	post?: number;
	following?: number;
	followers?: number;

	profilePicture?: string;
	bannerPicture?: string;
}

const authContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
	children: React.ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	// const login = (_validName: any) => {
	// 	setUserData({
	// 		...userData,
	// 		validName: _validName,
	// 	});
	// };

	// const logout = () => {
	// 	setUserData({
	// 		username: '',
	// 	});
	// };

	// --------------------------------------------- TESTING GROUND WARNING ---------------------------------------------- //
	const [userData, setUserData] = useState<any>({
		username: '',
		validName: '',
		email: '',
		password: '',
		bio: '',

		post: 0,
		followers: 0,
		following: 0,

		profilePicture: '',
		bannerPicture: '',
	});

	const signupHandler = ({ _username, _email, _password }: any) => {
		setUserData({
			...userData,
			username: _username,
			email: _email,
			password: _password,
		});
	};

	const loginHandler = ({ _username, _password }: any) => {
		console.log(_username, _password);
	};

	return (
		<authContext.Provider value={{ userData, signupHandler, loginHandler }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(authContext);
};
