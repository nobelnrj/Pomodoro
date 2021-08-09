/** @format */

import React, { useState } from "react";
import authForm from "../../assets/css/auth/authForm.module.css";

export default function ArrayInput(props) {
	console.log(props.value);
	// const [arrayInput, setArrayInput] = useState(props.value);
	console.log(props);
	const onChange = (e) => {
		if (e.target.value.includes(",")) {
			let value = e.target.value.slice(0, -1);
			console.log(value);
			let currentArray = props.value;
			currentArray.push(value);
			props.onChange(currentArray);
			e.target.value = "";
		}
	};
	const removeTag = (e) => {
		let value = e.target.dataset.value;
		let currentArray = props.value;
		console.log(currentArray);
		currentArray.splice(currentArray.indexOf(value), 1);
		// console.log(currentArray);
		// let newArray = currentArray;
		// setArrayInput(
		// 	arrayInput.splice(arrayInput.indexOf(e.target.dataset.value), 1)
		// );
	};
	const populateTags = () => {
		if (props.value !== undefined) {
			console.log("triggered");
			return props.value.map((value, index) => {
				return (
					<span
						key={index}
						onClick={removeTag}
						data-value={value}
						className={authForm.arrayValue}>
						{value}
					</span>
				);
			});
		}
	};
	return (
		<div className={authForm.authInputWrapper}>
			<input
				onChange={onChange}
				className={authForm.formInput}
				id={props.id}
				type={props.type}
				placeholder="Add ',' (comma) to separate values"
			/>
			<label className={authForm.formLabel} htmlFor={props.id}>
				{props.label}
			</label>
			<div className={authForm.arrayWrapper}>{populateTags()}</div>
			{/* <span className={authForm.formError}>{this.state.errors}</span> */}
		</div>
	);
}
