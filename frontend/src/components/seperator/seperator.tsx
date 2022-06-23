import React, { FC } from "react"; 
import { BellIcon } from "../icons/bell";
import { MenuIcon } from "../icons/menu";
import "./seperator.css";

interface SeperatorProps {
	show: boolean;
	bottomNav?: boolean
	className?: string;
}

export const Seperator: FC<SeperatorProps> = props => {

	const {
		show,
		className
	} = props;

	return show && show ? ( 
		<div className="seperator-container">
			<div
				className={className !== undefined ? `seperator-element ${className}` : "seperator-element"}
			></div>
		</div>
	) : null;
};
