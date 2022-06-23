import React, { FC } from "react"; 
import { BellIcon } from "../icons/bell";
import { MenuIcon } from "../icons/menu";
import "./navbar.css";

interface NavbarProps {
	show: boolean;
	bottomNav?: boolean
	className?: string;
}

export const Navbar: FC<NavbarProps> = props => {

	const {
		show,
		bottomNav,
		className  
	} = props;

	return show && show ? 
		bottomNav && bottomNav ? (
			<div className="navbar-bottom">

			</div>
		) : (
			<div className={className !== undefined ? `navbar-top ${className}` : "navbar-top"}>
				<div className="navbar-top__container">
					<div className="navbar-top__wrapper">
						<button className="navbar-top__icon-wrapper">
							<BellIcon />
						</button>
					</div>

					<div className="navbar-top__wrapper navbar-top__wrapper--align-right">
						<button className="navbar-top__icon-wrapper">
							<MenuIcon />
						</button>
					</div>
				</div>
			</div>
		) : null;
};
