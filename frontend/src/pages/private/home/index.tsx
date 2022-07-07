import React from 'react';
import { Navbar } from '../../../components/navbar/navbar';
import { Post } from '../../../components/post/post';
import './index.css';

export const HomePage = () => {
	// const fetchStory = async () => {
	// 	const response = await fetch('/api/story');
	// 	const story = await response.json();
	// 	return story;
	// };

	// const renderStory = async () => {
	// 	const story = await fetchStory();
	// 	return (
	// 		<div className="story-wrapper">
	// 			<div className="story-wrapper__avatar">
	// 				<img
	// 					className="story-wrapper__avatar__img"
	// 					src={require(story.avatar)}
	// 					alt="story"
	// 				/>
	// 			</div>
	// 			<div className="story-wrapper__username">
	// 				{require(story.username)}
	// 			</div>
	// 		</div>
	// 	);
	// };

	// const fetchPosts = async () => {
	// 	const response = await fetch('/api/posts');
	// 	const posts = await response.json();
	// 	return posts;
	// };

	// const renderContent = async () => {
	// 	const posts = await fetchPosts();
	// 	return posts.map((post: object) => (
	// 		<Post key={post.id} postData={post} />
	// 	));
	// };

	return <div className="home"></div>;
};
