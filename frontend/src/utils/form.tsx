import React, { FC, useContext, useState } from 'react';
import { EyeSlashIcon, EyeIcon } from '../components/icons';

interface FormConfigProps {
	children: React.ReactNode;
}

interface FormContextProps {
	passwordVisible: boolean;
	setPasswordVisible: (value: boolean) => void;
	passwordIcon: JSX.Element;
	setPasswordIcon: (value: JSX.Element) => void;
	showPassword: () => void;
	passwordType: string;
}

const FormContext = React.createContext<FormContextProps | null>(null);

export const FormConfig: FC<FormConfigProps> = ({ children }) => {
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [passwordIcon, setPasswordicon] = useState<JSX.Element>(
		<EyeSlashIcon />
	);

	const showPassword = () => {
		setPasswordVisible(!passwordVisible);
		setPasswordicon(passwordVisible ? <EyeSlashIcon /> : <EyeIcon />);
	};

	const passwordType = passwordVisible ? 'text' : 'password';

	return (
		<FormContext.Provider
			value={{
				passwordVisible,
				setPasswordVisible,
				passwordIcon,
				setPasswordIcon: showPassword,
				showPassword,
				passwordType,
			}}
		>
			{children}
		</FormContext.Provider>
	);
};

export const useForm = () => {
	return useContext(FormContext);
};
