import React from 'react';
import { SearchIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import './index.css';

const renderMessageItem = () => {
	return (
		<div className="message-item">
			<div className="message-item__image"></div>

			<div className="message-item__content">
				<div className="message-item__content__header">
					<div className="message-item__content__header__username"></div>
					<div className="message-item__content__header__time"></div>
				</div>
				<div className="message-item__massage-text"></div>
			</div>
		</div>
	);
};

export const MessegesPage = () => {
	return (
		<div className="Messeges">
			<Input icon={<SearchIcon />} placeholder="Search . . ." />

			<div className="Messeges__items-container">
				{renderMessageItem()}
			</div>
		</div>
	);
};
