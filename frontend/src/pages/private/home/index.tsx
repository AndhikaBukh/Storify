import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../../components/navbar/navbar';
import { Post } from '../../../components/post/post';
import { useAuth } from '../../../utils/auth';
import './index.css';

const userData = {
	username: 'Andhika Bukhari',
	validName: '@AndhikaBukh',
	bio: 'Front-End Developer Student, At SMK Negeri 1 Surabaya',

	posts: 0,
	followers: 0,
	following: 0,

	profilePicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png',
	bannerPicture:
		'https://cdn.discordapp.com/attachments/938793007833047080/993527689614999593/Project_Sylly_2.png',

	isFollowed: false,
};

const postData = {
	id: 1, // Ignore this, it's just for testing
	postAuthor: userData.username,
	postAuthorName: userData.validName,
	profilePicture: userData.profilePicture,

	postImage:
		'https://cdn.discordapp.com/attachments/938793007833047080/993527689614999593/Project_Sylly_2.png',
	postDescription: 'This is a test post',

	isFollowed: userData.isFollowed,
	isLiked: false,
	likes: 0,
	comments: 0,
};

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

	const auth = useAuth();

	useEffect(() => {
		auth?.requireLogin();

		document.title = 'Project Sylly - Home';
	}, []);

	return (
		<div className="home">
			<Navbar className="home--navbar" type="top" />

			<div className="home__content-container">
				{/* <Post id={0} postData={postData} /> */}
			</div>
		</div>
	);
};
