import React from "react";
import { Button } from "../components/button/button";
import { PassIcon } from "../components/icons/pass";
import { UserIcon } from "../components/icons/user";
import { Input } from "../components/input/input";
import { Seperator } from "../components/seperator/seperator";
import "./index.css";

export const Login = () => {
	return (
		<div className="login">
			<header className="login__header">
				<img className="login__header-icon" src="/logo.png" alt="" />

				<h1 className="login__header-title">
					Hi There! <br />
					Welcome Back.
				</h1>
			</header>

			<div className="login__input-container">
				<Input show icon={(<UserIcon color="#776bf8" />)} placeholder="Username" />
				<Input show icon={(<PassIcon color="#776bf8" />)} placeholder="Password" type="password"/>

				<div className="login__input-seperator">
					<Seperator show />
					Or
					<Seperator show />
				</div>

				<Button show >Sign In With Google</Button>
			</div>

			<div className="login__button-container">
				
			</div>
		</div>
	);
};
