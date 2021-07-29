/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import cloneDeep from "lodash/cloneDeep";
import isEqual from "lodash/isEqual";
import omit from "lodash/omit";
import isFunction from "lodash/isFunction";
import keys from "lodash/keys";
import { ValueContext, OnChangeContext } from "./context";
import getNewValue from "./getNewValue";
import authForm from "../../assets/css/auth/authForm.module.css";

export default class Form extends Component {
	static propTypes = {
		children: PropTypes.node,
		state: PropTypes.object,
		addSubmitButton: PropTypes.bool,
		onSubmit: PropTypes.func,
		onChange: PropTypes.func,
		buttontext: PropTypes.string,
	};
	constructor(props) {
		super();
		console.log(props);
		this.state = { value: cloneDeep(props.state.value) };
	}
	componentDidUpdate(prevProps, prevState) {
		if (!isEqual(prevProps.state.value, this.props.state.value)) {
			this.resetState();
		}
	}

	resetState() {
		this.setState({ value: cloneDeep(this.props.state.value) }); // will reset state because state prop has changed
	}

	getValue = () => {
		return this.state.value || {};
	};

	onChange = (fieldName, fieldValue) => {
		const value = getNewValue(this.getValue(), fieldName, fieldValue);
		this.setState({ value });
		this.props.onChange(value);
	};

	onFormSubmit = (event) => {
		event.preventDefault();
		return this.submit();
	};

	submit = () => {
		if (!isFunction(this.props.onSubmit)) {
			console.warn("You should pass a onSubmit prop to this form");
			return;
		}
		return this.props.onSubmit(this.getValue());
	};

	renderChild() {
		const domProps = omit(this.props, keys(Form.propTypes));
		console.log(this.props);
		return (
			<OnChangeContext.Provider value={this.onChange}>
				<ValueContext.Provider value={this.state.value}>
					<form {...domProps} ref="form" onSubmit={this.onFormSubmit}>
						{this.props.children}
						{this.props.addSubmitButton ? (
							<button className={authForm.formButton} type="submit">
								{this.props.buttontext}
							</button>
						) : null}
					</form>
				</ValueContext.Provider>
			</OnChangeContext.Provider>
		);
	}
	render() {
		return <div>{this.renderChild()}</div>;
	}
}
