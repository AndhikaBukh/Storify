import React from 'react';
import { ChatItem } from '../../../components/chatItem/chatItem';
import { SearchIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';
import './index.css';

export const MessegesPage = () => {
	return (
		<div className="Messeges">
			<Input icon={<SearchIcon />} placeholder="Search . . ." />

			<div className="Messeges__items-container">
				<ChatItem />
				<ChatItem />
				<ChatItem />
				<ChatItem />
				<ChatItem />
				<ChatItem />
			</div>
		</div>
	);
};
