import React, { FC } from 'react';
import { Navbar } from '../components/navbar/navbar';
import { Post } from '../components/post/post';
import './index.css';

export const Home = () => {
	return (
		<div className="home">
			<Navbar type="top" />
			<div className="home__container">
				<Post />
			</div>
		</div>
	);
};
