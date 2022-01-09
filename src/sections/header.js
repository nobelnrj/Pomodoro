/** @format */

import React, { Component } from "react";
import "../assets/css/sections/header.css";

export default class header extends Component {
	render() {
		return (
			<header className="appHeader">
				<h1
					className="mainLogo"
					onMouseDown={this.startElemDrag}
					onMouseUp={this.closeDragElement}>
					<svg width="100%" height="100%">
						<defs>
							<style>
								@import url("https://fonts.googleapis.com/css?
								family=Lora:400,400i,700,700i");
							</style>
						</defs>

						<text x="50%" y="60%" textAnchor="middle">
							NRJ
						</text>
					</svg>
				</h1>
			</header>
		);
	}
}
