/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Field from "../components/FormElements/Field";
import Form from "../components/FormElements/Form";
import authForm from "../assets/css/auth/authForm.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getProjectById } from "../store/actions/projects/action";

class EditExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			value: {
				teamLead: "",
				colorCode: "",
				description: "",
				duration: "",
				projectName: "",
				projectStatus: "",
				projectType: "",
				startDate: new Date(),
				tags: [],
			},
		};
	}

	componentDidMount() {
		this.props.getProjectById(this.props.match.params.id);
		axios
			.get("http://localhost:5000/employees/")
			.then((response) => {
				if (response.data.length > 0) {
					this.setState({
						users: response.data.map((user) => user.username),
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.projectById);
		if (nextProps.projectById) {
			let value = {
				teamLead: nextProps.projectById.projects.teamLead,
				colorCode: nextProps.projectById.projects.colorCode,
				description: nextProps.projectById.projects.description,
				duration: nextProps.projectById.projects.duration,
				projectName: nextProps.projectById.projects.projectName,
				projectStatus: nextProps.projectById.projects.projectStatus,
				projectType: nextProps.projectById.projects.projectType,
				startDate: new Date(nextProps.projectById.projects.startDate),
				tags: nextProps.projectById.projects.tags,
			};
			this.setState({
				value,
			});
		}
	}

	onChangeDate(date) {
		let valueObject = this.state.value;
		valueObject["startDate"] = date;
		this.setState({
			value: valueObject,
		});
	}

	onSubmit(e) {
		const project = {
			teamLead: this.state.value.teamLead,
			projectName: this.state.value.projectName,
			description: this.state.value.description,
			duration: this.state.value.duration,
			projectType: this.state.value.projectType,
			colorCode: this.state.value.colorCode,
			projectStatus: this.state.value.projectStatus,
			startDate: this.state.value.startDate,
			tags: this.state.value.tags,
		};

		console.log(project);

		axios
			.post(
				"http://localhost:5000/projects/update/" + this.props.match.params.id,
				project
			)
			.then((res) => console.log(res.data));

		// window.location = "/";
	}

	render() {
		return (
			<div className="wrapper-box">
				<h3 className="wrapper-heading">
					Edit {this.state.value.projectName} data
				</h3>
				<Form
					state={this.state}
					addSubmitButton={true}
					onChange={(value) => this.setState({ value })}
					onSubmit={this.onSubmit}
					buttontext="Update Exercise">
					<Field
						type="text"
						id="teamLead"
						className="select"
						isRequired={true}
						label="Team Lead"
						fieldName="teamLead"
						value={this.state.value.teamLead}
					/>
					<Field
						type="text"
						id="projectName"
						className="something"
						isRequired={true}
						label="Project Name"
						fieldName="projectName"
						value={this.state.value.projectName}
					/>
					<Field
						type="text"
						id="description"
						className="something"
						isRequired={true}
						label="Description"
						fieldName="description"
						value={this.state.value.description}
					/>
					<Field
						type="text"
						id="duration"
						className="something"
						isRequired={true}
						label="Duration (in days)"
						fieldName="duration"
						value={this.state.value.duration}
					/>
					<Field
						type="text"
						id="projectType"
						className="something"
						isRequired={true}
						label="Project Type"
						fieldName="projectType"
						value={this.state.value.projectType}
					/>
					<Field
						type="text"
						id="colorCode"
						className="something"
						isRequired={true}
						label="Color Code"
						fieldName="colorCode"
						value={this.state.value.colorCode}
					/>
					<Field
						type="text"
						id="projectStatus"
						className="something"
						isRequired={true}
						label="Project Status"
						fieldName="projectStatus"
						value={this.state.value.projectStatus}
					/>
					<div className={authForm.authInputWrapper}>
						<DatePicker
							className={authForm.formInput}
							id="date-picker"
							selected={this.state.value.startDate}
							onChange={this.onChangeDate}
						/>
						<label
							className={authForm.formLabel + " " + authForm.active}
							htmlFor="date-picker">
							Start Date
						</label>
					</div>
					<Field
						type="arrayInput"
						id="tags"
						className="something"
						label="Project Tags"
						fieldName="tags"
						value={this.state.value.tags}
					/>
				</Form>
			</div>
		);
	}
}

EditExercise.propTypes = {
	getProjectById: PropTypes.func.isRequired,
	projectById: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	projectById: state.projects,
	errors: state.errors,
});

export default withRouter(
	connect(mapStateToProps, { getProjectById })(EditExercise)
);
