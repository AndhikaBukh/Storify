import { ChangeEventHandler, FC, RefObject, useEffect, useRef } from 'react';
import './input.css';

interface InputProps {
	show?: boolean;
	placeholder?: string;
	type?: string;
	icon?: JSX.Element;
	eventIcon?: JSX.Element;
	handleEventIcon?: () => void;
	handleElement?:
		| ChangeEventHandler<HTMLInputElement>
		| ((element: any) => void);
	refElement?: RefObject<HTMLInputElement>;
	onChange?: (event: any) => void;
	isHighlighted?: boolean;
	className?: string;
}

export const Input: FC<InputProps> = ({
	show = true,
	placeholder,
	type,
	icon = undefined,
	eventIcon,
	handleEventIcon = () => true,
	refElement = useRef<HTMLInputElement>(null),
	onChange = e => e,
	isHighlighted = false,
	className = '',
}) => {
	const handleClassName = `input-container ${className ? className : ''}${
		icon === undefined ? ' input-container--without-icon' : ''
	} ${isHighlighted ? 'input-container--highlighted' : ''}`;
	return show && show ? (
		<div
			className={handleClassName}
			onClick={() => refElement.current?.focus()}
		>
			{icon !== undefined ? (
				<div
					className="input-container__icon-wrapper"
					onClick={() => refElement.current?.focus()}
				>
					{icon}
				</div>
			) : null}

			<input
				className="input-container__element"
				type={type !== undefined ? type : 'text'}
				placeholder={placeholder}
				ref={refElement}
				onChange={e => onChange(e)}
			/>

			{eventIcon !== undefined ? (
				<button
					className="input-container__icon-wrapper input-container__icon-wrapper--event"
					onClick={handleEventIcon}
				>
					{eventIcon}
				</button>
			) : null}
		</div>
	) : null;
};
