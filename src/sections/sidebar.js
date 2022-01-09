/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import SidebarMenu from "../components/Sidebar-menu/sidebar-menu";
import styles from "../assets/css/sections/sidebar-menu.module.css";
import { ReactComponent as FootballIcon } from "../assets/svg/football.svg";

export default class Navbar extends Component {
	constructor(props) {
		super(props);

		this.state = {
			expanded: false,
			footballLabel: false,
		};
	}

	render() {
		const { footballLabel } = this.state;
		return (
			<aside
				className={
					this.state.expanded
						? `${styles.sidebar} ${styles.expanded}`
						: styles.sidebar
				}
				onMouseEnter={() => {
					if (window.innerWidth > 700) { this.setState({ expanded: true }) };
				}}
				onMouseLeave={() => {
					if (window.innerWidth > 700) { this.setState({ expanded: false }) };
				}}>
				<nav>
					<Link to="/" className={styles.logo}>
						<span>{footballLabel ? <span style={{paddingLeft: "24px"}}>I  🖤  Foot</span> : "Portfolio"}</span>
						<FootballIcon onMouseEnter={() => this.setState({ footballLabel: true })} onMouseLeave={() => this.setState({footballLabel: false})}/>
					</Link>
					<SidebarMenu expanded={this.state.expanded} />
				</nav>
			</aside>
		);
	}
}
