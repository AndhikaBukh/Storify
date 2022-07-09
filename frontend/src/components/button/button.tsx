import React, { FC } from 'react';
import './button.css';

interface ButtonProps {
	show?: boolean;
	children: string | JSX.Element | JSX.Element[];
	type?: 'primary' | 'bold' | 'optional';
	onClick?: () => void;
	className?: string;
}

export const Button: FC<ButtonProps> = props => {
	const {
		show = true,
		children,
		type = 'primary',
		onClick,
		className,
	} = props;

	return show && show ? (
		<button
			className={
				className !== undefined
					? `button ${type} ${className}`
					: `button ${type}`
			}
			onClick={onClick}
		>
			{children}
		</button>
	) : null;
};
