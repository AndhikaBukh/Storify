import React, { FC, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeSlashIcon, EyeIcon } from '../components/icons';

const preventedRoutes = [
	'/login',
	'/register',
	'/forgot-password',
	'/reset-password',
	'/verify-email',
	'/landing',
];

export const useHistory = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const previous = (isDefault = false, defaultLink = '/') => {
		if (isDefault) {
			navigate(defaultLink);
			return;
		}

		if (window.history.length > 1) {
			window.history.back();
			return;
		}

		navigate('/');
	};

	return {
		previous,
	};
};
