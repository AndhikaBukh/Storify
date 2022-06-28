import React from 'react';
import { ChatItem } from '../components/chatItem/chatItem';
import { SearchIcon } from '../components/icons';
import { Input } from '../components/input/input';
import './index.css';

export const Profile = () => {
	return (
		<div className="chat">
			<Input icon={<SearchIcon />} placeholder="Search . . ." />

			<div className="chat__items-container">
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
