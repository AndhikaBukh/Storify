import React from 'react';

import './chatItem.css';

export const ChatItem = () => {
	return (
		<div className="chat-item">
			<div className="chat-item__image"></div>

			<div className="chat-item__content">
				<div className="chat-item__content__header">
					<div className="chat-item__content__header__username"></div>
					<div className="chat-item__content__header__time"></div>
				</div>
				<div className="chat-item__massage-text"></div>
			</div>
		</div>
	);
};
