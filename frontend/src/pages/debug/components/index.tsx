import React from 'react';
import { PenIcon } from '../../../components/icons';
import { Input } from '../../../components/input/input';

export const ComponentsDebug = () => {
	return (
		<div className="debug__content__container debug--hide">
			<div className="debug__content__header">
				This is {'<Input />'} Component
			</div>
			<Input />
			<Input placeholder="This is a placeholder" />
			<Input icon={<PenIcon />} placeholder="This is a placeholder" />
		</div>
	);
};
