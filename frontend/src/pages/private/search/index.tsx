import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const SearchPage = () => {
	const auth = useAuth();

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Search';
	}, []);

	return (
		<div className="search">
			<Navbar type="top" />
		</div>
	);
};
