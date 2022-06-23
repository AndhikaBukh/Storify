import React, { FC } from "react"; 
import "./button.css";

interface ButtonProps {
	show: boolean;
	children: string;
	type?: string;
	handleClick?: () => void;
	className?: string;
}

export const Button: FC<ButtonProps> = props => {

	const {
		show,
		children,
		type,
		handleClick,
		className  
	} = props;

	return show && show ? (
		<button 
			className={className !== undefined ? `button ${className}` : "button"}
			onClick={() => handleClick}
		>
			{children}
		</button>
	) : null;
};
