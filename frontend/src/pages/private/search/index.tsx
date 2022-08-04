import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import { Navbar } from '../../../components/navbar/navbar';
import { useAuth } from '../../../utils/auth';
import './index.css';

export const SearchPage = () => {
	const auth = useAuth();

	useEffect(() => {
		document.title = 'Project Sylly - Search';
	}, []);

	return (
		<div className="search">
			<Navbar
				className="search--navbar"
				type="top"
				topNavbarAttributes={{
					leftContent: (
						<Input
							className="navbar__search"
							type="search"
							placeholder="Search . . ."
							eventIcon={
								<SearchIcon className="navbar__search__icon" />
							}
						/>
					),
					rightContent: undefined,
				}}
			/>

			<div className="search__wrapper"></div>
		</div>
	);
};
