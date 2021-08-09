/** @format */

import React, { Component } from "react";
import authForm from "../../assets/css/auth/authForm.module.css";

export default class Input extends Component {
	constructor(props) {
		super();
	}
	onChange = (e) => {
		this.props.onChange(e.target.value);
	};
	render() {
		return (
			<div className={authForm.authInputWrapper}>
				<input
					onChange={this.onChange.bind(this)}
					required={this.props.isRequired}
					className={authForm.formInput}
					id={this.props.id}
					type={this.props.type}
					value={this.props.value}
				/>
				<label className={authForm.formLabel} htmlFor={this.props.id}>
					{this.props.label}
				</label>
				{/* <span className={authForm.formError}>{this.state.errors}</span> */}
			</div>
		);
	}
}
