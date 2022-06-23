import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Login } from "./login";
import { Landing } from "./landing";
import { Input } from "./components/input/input";
import { BellIcon } from "./components/icons/bell";

function App() {
	return (
		<div className="app">
			<Login />
		</div>
	);
}

export default App;
