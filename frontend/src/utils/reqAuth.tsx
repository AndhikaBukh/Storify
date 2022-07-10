import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface reqAuthProps {
	children: JSX.Element;
}

export const ReqAuth: FC<reqAuthProps> = ({ children }) => {
	const navigate = useNavigate();

	if (!localStorage.getItem('token')) {
		navigate('/');
	}

	return children;
};
