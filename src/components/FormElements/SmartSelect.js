/** @format */

import React, { Component } from "react";
import authForm from "../../assets/css/auth/authForm.module.css";

export default class Input extends Component {
	constructor(props) {
		super();
		// this.state = {
		// 	value: props.value,
		// 	type: props.type,
		// 	id: props.id,
		// 	class: props.className,
		// 	isRequired: props.isRequired,
		// 	label: props.label,
		// 	fieldName: props.fieldName,
		// 	optionsValue: props.optionsValue || null,
		// };
		console.log(props.optionsValue);
	}
	onChange = (e) => {
		this.props.onChange(e.target.value);
	};
	render() {
		return (
			<div className={authForm.authInputWrapper}>
				<input
					onChange={this.onChange}
					// value={this.state.value[this.state.fieldName]}
					required={this.props.isRequired}
					className={authForm.formInput}
					id={this.props.id}
					type={this.props.type}
				/>
				<label className={authForm.formLabel} htmlFor={this.props.id}>
					{this.props.label}
				</label>
				{/* <span className={authForm.formError}>{this.state.errors}</span> */}
			</div>
		);
	}
}
