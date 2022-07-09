import { createContext, FC, useContext, useState } from 'react';

interface IAuthContext {
	userData: userDataProps;
	login: (user: any) => void;
	logout: () => void;
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
	const [userData, setUserData] = useState<userDataProps>({
		username: '',
		validName: '',
		bio: '',

		post: 0,
		followers: 0,
		following: 0,

		profilePicture: '',
		bannerPicture: '',
	});

	const login = (_validName: any) => {
		setUserData({
			...userData,
			validName: _validName,
		});
	};

	const logout = () => {
		setUserData({
			username: '',
		});
	};

	return (
		<authContext.Provider value={{ userData, login, logout }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(authContext);
};
