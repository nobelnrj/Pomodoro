/** @format */

import React, { Component } from "react";
import authForm from "../../assets/css/auth/authForm.module.css";

export default class Input extends Component {
	constructor(props) {
		super();
		this.state = {
			value: props.value,
			type: props.type,
			id: props.id,
			class: props.className,
			isRequired: props.isRequired,
			label: props.label,
			fieldName: props.fieldName,
			optionsValue: props.optionsValue || null,
		};
	}
	onChange = (e) => {
		this.props.onChange(e.target.value);
	};
	render() {
		return (
			<div className={authForm.authInputWrapper}>
				<input
					onChange={this.onChange.bind(this)}
					required={this.state.isRequired}
					className={authForm.formInput}
					id={this.state.id}
					type={this.state.type}
				/>
				<label className={authForm.formLabel} htmlFor={this.state.id}>
					{this.state.label}
				</label>
				{/* <span className={authForm.formError}>{this.state.errors}</span> */}
			</div>
		);
	}
}
