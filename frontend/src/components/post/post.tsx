import React, { FC } from 'react';
import { CommentIcon, HeartIcon, SendIcon, StarIcon } from '../icons';
import './post.css';

interface PostProps {
	id: number;
	postData: postDataProps | undefined;
}

interface postDataProps {
	postAuthor: string;
	postAuthorName: string;
	profilePicture: string;

	postImage: string;
	postDescription: string;
	postTime: string;

	isFollowed: boolean;
	isLiked: boolean;
	isSaved: boolean;

	likes: 0;
	comments: 0;
}

export const Post: FC<PostProps> = ({ postData }) => {
	const {
		postAuthor,
		postAuthorName,
		profilePicture,

		postImage,
		postDescription,
		postTime,

		isFollowed,
		isLiked,
		isSaved,

		likes,
		comments,
	} = postData || {};

	return (
		<div className="post">
			<div className="post__container">
				<div className="post__author">
					<img
						className="post__author__avatar"
						src={profilePicture}
						alt=""
					/>
					<div className="post__author__username">{postAuthor}</div>
					<div className="post__author__valid-name">
						{postAuthorName}
					</div>
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
								{postAuthor}
							</div>
							<div className="post__content-text__wrapper">
								{postDescription}
							</div>
						</div>

						<div className="post__content-text__time">
							{postTime}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
