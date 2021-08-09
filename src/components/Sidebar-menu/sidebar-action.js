/** @format */

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReactComponent as LogOutIcon } from "../../assets/svg/logout.svg";
import { logoutUser } from "../../store/actions/authActions";
import styles from "../../assets/css/sections/sidebar-menu.module.css";

export default function SidebarMenu(props) {
	const dispatch = useDispatch();
	const triggerLogout = () => {
		dispatch(logoutUser());
	};
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	console.log(isAuthenticated);
	return (
		<ul className={styles.sidebarAction}>
			<li className={styles.sidebarMenuItem}>
				{isAuthenticated ? (
					<button className={styles.sidebarMenuLink} onClick={triggerLogout}>
						<LogOutIcon />
						<span className={styles.sidebarMenuLinkText}>LogOut</span>
					</button>
				) : (
					<NavLink to="/login" className={styles.sidebarMenuLink}>
						<LogOutIcon />
						<span className={styles.sidebarMenuLinkText}>Login</span>
					</NavLink>
				)}
			</li>
		</ul>
	);
}
