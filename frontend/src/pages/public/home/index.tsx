import React from 'react';
import { Navbar } from '../../../components/navbar/navbar';
import { Post } from '../../../components/post/post';
import './index.css';

export const Home = () => {
	return (
		<div className="home">
			<Navbar type="top" />
			<div className="home__container">
				<Post />
				<Post />
				<Post />
			</div>
			<Navbar type="bottom" />
		</div>
	);
};
