import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SidebarMenu from '../components/Sidebar-menu/sidebar-menu';
import '../assets/css/pages/sidebar.css';

export default class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }
  }

  render() {
    return (
      <aside 
        className={
          this.state.expanded ? 'sidebar expanded' : 'sidebar'
        }
        onMouseEnter={() => {this.setState({expanded: true})}} 
        onMouseLeave={() => {this.setState({expanded: false})}}>
        <nav>
          <Link to="/" className="logo">
            {
              this.state.expanded ? 'Pomodoro' : 'Pro'
            }
          </Link>
          <SidebarMenu expanded={this.state.expanded}/>
        </nav>
      </aside>
    );
  }
}