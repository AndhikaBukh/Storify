import {
	ChangeEventHandler,
	FC,
	RefObject,
	useEffect,
	useRef,
	useState,
} from 'react';
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
	value?: string;
	disabled?: boolean;
	autoFocus?: boolean;
	className?: string;
}

export const Input: FC<InputProps> = ({
	show = true,
	placeholder,
	type = 'text',
	icon = undefined,
	eventIcon,
	handleEventIcon = () => true,
	refElement = useRef<HTMLInputElement>(null),
	onChange = e => e,
	isHighlighted = false,
	value,
	disabled = false,
	autoFocus = false,
	className = '',
}) => {
	const handleClassName = `input-container ${className ? className : ''}${
		icon === undefined && eventIcon === undefined
			? ' input-container--without-icon'
			: ''
	} ${isHighlighted ? 'input-container--highlighted' : ''}`;

	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return show && type !== 'textarea' ? (
		<div
			className={handleClassName}
			onClick={() => refElement.current?.focus()}
			style={{
				cursor: disabled ? 'not-allowed' : 'text',
			}}
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
				type={type}
				placeholder={placeholder}
				ref={refElement}
				value={inputValue}
				onChange={e => {
					onChange(e);
				}}
				disabled={disabled}
				autoFocus={autoFocus}
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
	) : show && type === 'textarea' ? (
		<textarea
			className={`input-container__element input-container__element--textarea ${className}`}
			placeholder={placeholder}
			value={inputValue}
			onChange={e => {
				setInputValue(e.target.value);
				onChange(e);
			}}
			disabled={disabled}
			autoFocus={autoFocus}
			spellCheck={false}
		/>
	) : null;
};
