import React, { FC } from 'react';
import { CommentIcon, HeartIcon, SendIcon, StarIcon } from '../icons';
import './post.css';

interface PostProps {
	id: number;
	postData: postData;
}

interface postData {
	author: string;
	authorAvatar: string;
	postImage: string;
	description: string;
	likes: number;
	comments: number;
	time: string;
}

export const Post: FC<PostProps> = ({ postData }) => {
	const {
		author = '',
		authorAvatar,
		postImage,
		description,
		likes = 0,
		comments = 0,
		time,
	} = postData;

	return (
		<div className="post">
			<div className="post__container">
				<div className="post__author">
					<img
						className="post__author__avatar"
						src={authorAvatar}
						alt=""
					/>
					<div className="post__author__name">{author}</div>
				</div>

				<div className="post__content">
					<img
						className="post__content-image"
						src={postImage}
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
								{likes}
							</div>
							<div className="post__content-text__likes-text">
								Likes
							</div>
						</div>

						<div className="post__content-text__container">
							<div className="post__content-text__username">
								{author}
							</div>
							<div className="post__content-text__wrapper">
								{description}
							</div>
						</div>

						<div className="post__content-text__time">{time}</div>
					</div>
				</div>
			</div>
		</div>
	);
};
