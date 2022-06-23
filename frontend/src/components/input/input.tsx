import { FC } from "react"; 
import "./input.css";

interface InputProps {
	show?: boolean;
	placeholder?: string;
	type?: string;
	icon?: JSX.Element;
	className?: string;
}

export const Input: FC<InputProps> = props => {
	const {
		show,
		placeholder,
		type,
		icon,
		className  
	} = props;

	return show && show ? (
		<div className={className !== undefined ? `input-container ${className}` : "input-container"}>
			{icon !== undefined ? (
				<div className="input-container__icon-wrapper">
					{icon}
				</div>
			) : null}

			<input
				className="input-container__element"
				type={type !== undefined ? type : "text"}
				placeholder={placeholder}
			/>
		</div>
	) : null;
};
