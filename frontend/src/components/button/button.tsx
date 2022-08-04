import React, { FC, useEffect } from 'react';
import './button.css';

interface ButtonProps {
	show?: boolean;
	children: string | JSX.Element | JSX.Element[];
	variant?: 'primary' | 'bold' | 'optional';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	className?: string;
}

export const Button: FC<ButtonProps> = props => {
	const {
		show = true,
		children,
		variant = 'primary',
		type = 'button',
		onClick,
		className,
	} = props;

	const refElement = React.useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (type === 'submit') {
			refElement.current?.addEventListener('keyup', e => {
				e.preventDefault();

				e.stopPropagation();

				if (e.key === 'Enter') {
					onClick?.();
				}
			});
		}
	}, []);

	return show && show ? (
		<button
			className={
				className !== undefined
					? `button ${variant} ${className}`
					: `button ${variant}`
			}
			onClick={onClick}
			type={type}
			ref={refElement}
		>
			{children}
		</button>
	) : null;
};
