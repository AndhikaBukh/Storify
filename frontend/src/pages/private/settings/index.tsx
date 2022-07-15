import { useEffect } from 'react';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const SettingsPage = () => {
	const auth = useAuth();

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Settings';
	}, []);

	return <div className="settings"></div>;
};
