import React from 'react';
import { CommentIcon, HeartIcon, SendIcon, StarIcon } from '../icons';
import './post.css';

// interface PostProps {
// 	id: number;
// 	title: string;
// 	description: string;
// 	image: string;
// 	likes: number;
// 	comments: number;
// 	stars: number;
// 	user: {
// 		name: string;
// 		avatar: string;
// 	};
// }

export const Post = () => {
	return (
		<div className="post">
			<div className="post__container">
				<div className="post__author">
					<img
						className="post__author__avatar"
						src="https://cdn.discordapp.com/attachments/938793007833047080/938795503322292274/Master_Image.png"
						alt=""
					/>
					<div className="post__author__name">AndhikaBukh</div>
				</div>

				<div className="post__content">
					<img
						className="post__content-image"
						src="https://cdn.discordapp.com/attachments/857487423201083403/992777424192413717/Project_Sylly_1.png"
						alt=""
					/>

					<div className="post__content-action">
						<div className="post__content-action__icon">
							<HeartIcon />
						</div>
						<div className="post__content-action__wrapper">
							<div className="post__content-action__icon">
								<SendIcon />
							</div>
							<div className="post__content-action__icon">
								<CommentIcon />
							</div>
							<div className="post__content-action__icon">
								<StarIcon />
							</div>
						</div>
					</div>

					<div className="post__content-text">
						<div className="post__content-text__likes">
							<div className="post__content-text__likes-amount">
								69
							</div>
							<div className="post__content-text__likes-text">
								Likes
							</div>
						</div>

						<div className="post__content-text__container">
							<div className="post__content-text__username">
								AndhikaBukh
							</div>
							<div className="post__content-text__wrapper">
								Next project is going to be big!
							</div>
						</div>

						<div className="post__content-text__time">
							1 hour ago
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
