import React from 'react';
import { Navbar } from '../../../components/navbar/navbar';
import { Post } from '../../../components/post/post';
import './index.css';

export const HomePage = () => {
	const renderStory = () => (
		<div className="story-wrapper">
			<div className="story-wrapper__avatar">
				<img
					className="story-wrapper__avatar__img"
					src="https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png"
					alt="story"
				/>
			</div>
			<div className="story-wrapper__username">TejusLemonnn</div>
		</div>
	);

	return (
		<div className="home">
			<Navbar type="top" />

			{/* Might be converted to componets */}
			<div className="story-container">
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
				<div className="story-container__story">{renderStory()}</div>
			</div>

			<div className="home__container">
				<Post />
				<Post />
				<Post />
			</div>

			<Navbar type="bottom" />
		</div>
	);
};
