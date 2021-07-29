/** @format */

import React, { Component } from "react";
import { ValueContext, OnChangeContext } from "./context";
import authForm from "../../assets/css/auth/authForm.module.css";

export default class FieldElement extends Component {
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
		};
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
