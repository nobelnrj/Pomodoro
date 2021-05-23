import React, { Component } from 'react';
import '../assets/css/parts/header.css';

export default class header extends Component {
  render() {
    return (
      <header className="appHeader">
        <h1 className="mainLogo">Company Logo</h1>
      </header>
    )
  }
}