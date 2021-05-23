import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as AddTaskIcon} from '../../assets/svg/add-task.svg';
import {ReactComponent as AddUserIcon} from '../../assets/svg/add-user.svg';
import {ReactComponent as TasksIcon} from '../../assets/svg/tasks.svg';
import styles from '../../assets/css/components/sidebar-menu.module.css';

export default class SidebarMenu extends Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <ul className={styles.sidebarMenu}>
                <li className={styles.sidebarMenuItem}>
                    <Link to="/" className={styles.sidebarMenuLink}>
                        <TasksIcon />
                        {
                            this.props.expanded && (
                                <span className={styles.sidebarMenuLinkText}>Projects</span>
                            )
                        }
                    </Link>
                </li>
                <li className={styles.sidebarMenuItem}>
                    <Link to="/create" className={styles.sidebarMenuLink}>
                        <AddTaskIcon />
                        {
                            this.props.expanded && (
                                <span className={styles.sidebarMenuLinkText}>Create Project</span>
                            )
                        }
                    </Link>
                </li>
                <li className={styles.sidebarMenuItem}>
                    <Link to="/user" className={styles.sidebarMenuLink}>
                        <AddUserIcon />
                        {
                            this.props.expanded && (
                                <span className={styles.sidebarMenuLinkText}>Create Employee</span>
                            )
                        }
                    </Link>
                </li>
            </ul>
        );
    }
}
