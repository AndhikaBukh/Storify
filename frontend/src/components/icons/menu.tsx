import * as React from "react";
import { FC } from "react";

interface MenuIconProps {
	color?: string
}

export const MenuIcon: FC<MenuIconProps> = ({color}) => (
	<svg viewBox="0 0 24 24">
		<path
			fill={color !== undefined ? color : "white"}
			d="M22 5C22 4.447 21.552 4 21 4H8C7.448 4 7 4.447 7 5C7 5.553 7.448 6 8 6H21C21.552 6 22 5.553 22 5ZM3 11H21C21.552 11 22 11.447 22 12C22 12.553 21.552 13 21 13H3C2.448 13 2 12.553 2 12C2 11.447 2.448 11 3 11ZM12 18H21C21.552 18 22 18.447 22 19C22 19.553 21.552 20 21 20H12C11.448 20 11 19.553 11 19C11 18.447 11.448 18 12 18Z" 
		/>
	</svg>
);