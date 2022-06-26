import React, { FC } from 'react';
import './input.css';

interface InputProps {
	show?: boolean;
	placeholder?: string;
	type?: string;
	icon?: JSX.Element;
	eventIcon?: JSX.Element;
	handleEventIcon?: () => void;
	handleInputValue?: (param: HTMLInputElement) => void;
	className?: string;
}

export const Input: FC<InputProps> = props => {
	const {
		show = true,
		placeholder,
		type,
		icon,
		eventIcon,
		handleEventIcon = () => true,
		handleInputValue = (e: Element) => e,
		className,
	} = props;

	return show && show ? (
		<div
			className={
				className !== undefined
					? `input-container ${className}`
					: 'input-container'
			}
		>
			{icon !== undefined ? (
				<div className="input-container__icon-wrapper">{icon}</div>
			) : null}

			<input
				className="input-container__element"
				type={type !== undefined ? type : 'text'}
				placeholder={placeholder}
				onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
					handleInputValue(e.target)
				}
			/>

			{eventIcon !== undefined ? (
				<button
					className="input-container__icon-wrapper"
					onClick={handleEventIcon}
				>
					{eventIcon}
				</button>
			) : null}
		</div>
	) : null;
};
