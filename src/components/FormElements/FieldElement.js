/** @format */

import React, { Component } from "react";
import { ValueContext, OnChangeContext } from "./context";
import authForm from "../../assets/css/auth/authForm.module.css";
import Input from "./Input";
import SmartSelect from "./SmartSelect";

export default class FieldElement extends Component {
	constructor(props) {
		super();
	}
	onChange = (value) => {
		this.props.onChange(value);
	};
	render() {
		const renderFieldElement = () => {
			switch (this.props.type) {
				case "text":
					return (
						<Input
							onChange={this.onChange}
							isRequired={this.props.isRequired}
							className={authForm.formInput}
							id={this.props.id}
							type={this.props.type}
							label={this.props.label}
						/>
					);
				case "select":
					return (
						<SmartSelect
							onChange={this.onChange}
							isRequired={this.props.isRequired}
							className={authForm.formInput}
							id={this.props.id}
							type={this.props.type}
							label={this.props.label}
							optionsValue={this.props.optionsValue}
						/>
					);

				default:
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
		};
		return <div>{renderFieldElement()}</div>;
	}
}
