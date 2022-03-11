/** @format */

import React, { Component } from "react";
import "../assets/css/sections/header.css";

export default class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "NRJ",
    };
  }
  render() {
    const { name } = this.state;
    return (
      <header className="appHeader">
        <h1
          className="mainLogo"
          onMouseDown={this.startElemDrag}
          onMouseUp={this.closeDragElement}
        >
          <span
            className="spanForN"
            onMouseEnter={() => this.setState({ name: "NOBEL" })}
            onMouseLeave={() => this.setState({ name: "NRJ" })}
          ></span>
          <span
            className="spanForR"
            onMouseEnter={() => this.setState({ name: "REO" })}
            onMouseLeave={() => this.setState({ name: "NRJ" })}
          ></span>
          <span
            className="spanForJ"
            onMouseEnter={() => this.setState({ name: "JACOB" })}
            onMouseLeave={() => this.setState({ name: "NRJ" })}
          ></span>
          <svg width="100%" height="100%">
            <defs>
              <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap');
              </style>
            </defs>

            <text x="50%" y="60%" textAnchor="middle">
              {name}
            </text>
          </svg>
        </h1>
      </header>
    );
  }
}
