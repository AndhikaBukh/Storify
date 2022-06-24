import React, { FC } from 'react';
import './button.css';

interface ButtonProps {
	show: boolean;
	children: string;
	type?: 'primary' | 'bold' | 'optional';
	handleClick?: () => void;
	className?: string;
}

export const Button: FC<ButtonProps> = props => {
	const { show, children, type = 'primary', handleClick, className } = props;

	return show && show ? (
		<button
			className={
				className !== undefined
					? `button ${type} ${className}`
					: `button ${type}`
			}
			onClick={() => handleClick}
		>
			{children}
		</button>
	) : null;
};
