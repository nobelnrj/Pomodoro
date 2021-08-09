import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { ReactComponent as AddTaskIcon } from "../../assets/svg/add-task.svg";
import { ReactComponent as AddUserIcon } from "../../assets/svg/add-user.svg";
import { ReactComponent as TasksIcon } from "../../assets/svg/tasks.svg";
import { ReactComponent as TimelineIcon } from "../../assets/svg/timeline.svg";
import styles from "../../assets/css/sections/sidebar-menu.module.css";
import { useSelector } from "react-redux";

export default function SidebarMenu() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
	console.log(isAuthenticated);
	return (
		<ul className={styles.sidebarMenu}>
			<li className={styles.sidebarMenuItem}>
				<NavLink
					exact
					activeClassName={styles.sidebarMenuLinkActive}
					to="/"
					className={styles.sidebarMenuLink}>
					<TasksIcon />
					<span className={styles.sidebarMenuLinkText}>Projects</span>
				</NavLink>
			</li>
			<li className={styles.sidebarMenuItem}>
				<NavLink
					exact
					activeClassName={styles.sidebarMenuLinkActive}
					to="/timeline"
					className={styles.sidebarMenuLink}>
					<TimelineIcon />
					<span className={styles.sidebarMenuLinkText}>Timeline</span>
				</NavLink>
			</li>
			{isAuthenticated ? (
				<li className={styles.sidebarMenuItem}>
					<NavLink
						activeClassName={styles.sidebarMenuLinkActive}
						to="/create"
						className={styles.sidebarMenuLink}>
						<AddTaskIcon />
						<span className={styles.sidebarMenuLinkText}>Create Project</span>
					</NavLink>
				</li>
			) : null}
			{isAuthenticated ? (
				<li className={styles.sidebarMenuItem}>
					<NavLink
						activeClassName={styles.sidebarMenuLinkActive}
						to="/user"
						className={styles.sidebarMenuLink}>
						<AddUserIcon />
						<span className={styles.sidebarMenuLinkText}>Create Employee</span>
					</NavLink>
				</li>
			) : null}
		</ul>
	);
}
