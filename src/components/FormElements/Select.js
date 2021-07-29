/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { ValueContext, OnChangeContext } from "./context";
import FieldElement from "./FieldElement";
import get from "lodash/get";
import omit from "lodash/omit";
import keys from "lodash/keys";

export default class Field extends Component {
	constructor(props) {
		super();
	}
	getChildProps({ value, onChange }) {
		/**
		 * This gets the props that are defined in the propTypes of the registered component.
		 */
		const propOptions = omit(this.props, keys(Field.propTypes));

		/**
		 * Options that are not registered in the propTypes are passed also
		 * in the passProps object
		 */
		const notDefinedOptions = omit(propOptions);

		const props = {
			value: get(value || {}, this.props.fieldName),
			passProps: notDefinedOptions,
			onChange: (newValue) => onChange(this.props.fieldName, newValue),
			...propOptions,
		};

		return props;
	}
	renderComponent(info) {
		const props = this.getChildProps(info);
		return (
			<ValueContext.Provider value={props.value}>
				<FieldElement {...props} />
			</ValueContext.Provider>
		);
	}
	render() {
		return (
			<OnChangeContext.Consumer>
				{(onChange) => (
					<ValueContext.Consumer>
						{(value) =>
							this.renderComponent({
								value,
								onChange,
							})
						}
					</ValueContext.Consumer>
				)}
			</OnChangeContext.Consumer>
		);
	}
}
