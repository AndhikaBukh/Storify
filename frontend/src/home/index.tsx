import React, { FC } from "react"; 
import "./index.css";

interface HomeProps {
	className?: string;
}

export const Home: FC<HomeProps> = props => {

	const {
		className  
	} = props;

	return (
		<button className={className !== undefined ? `input-container ${className}` : "input-container"}>
		</button>
	);
};
