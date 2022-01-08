/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "../components/Sidebar-menu/sidebar-menu";
import styles from "../assets/css/sections/sidebar-menu.module.css";

export default class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
		};
	}

	render() {
		return (
			<aside
				className={
					this.state.expanded
						? `${styles.sidebar} ${styles.expanded}`
						: styles.sidebar
				}
				onMouseEnter={() => {
					this.setState({ expanded: true });
				}}
				onMouseLeave={() => {
					this.setState({ expanded: false });
				}}>
				<nav>
					<Link to="/" className={styles.logo}>
						{this.state.expanded ? "Portfolio" : "NRJ"}
					</Link>
					<SidebarMenu expanded={this.state.expanded} />
				</nav>
			</aside>
		);
	}
}
