import { ChangeEventHandler, FC, RefObject, useRef } from 'react';
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
	className?: string;
}

export const Input: FC<InputProps> = ({
	show = true,
	placeholder,
	type,
	icon,
	eventIcon,
	handleEventIcon = () => true,
	refElement = useRef<HTMLInputElement>(null),
	className,
}) => {
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
				ref={refElement}
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
