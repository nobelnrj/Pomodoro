import React, { Component } from 'react';
import PropTypes from "prop-types";
import axios from "axios";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import Field from "../components/FormElements/Field";
import Form from "../components/FormElements/Form";
import authForm from "../assets/css/auth/authForm.module.css";
import { connect } from "react-redux";
import { getEmployees } from "../store/actions/employees/action";
import { postProject } from "../store/actions/projects/action";
import { withRouter } from "react-router-dom";

class CreateExercise extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);

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
			},
			employees: [],
			leads: [],
			postResponse: [],
		};
		props.getEmployees();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.employees) {
			this.setState({
				employees: nextProps.employees,
			});
		}
		console.log(this.state.employees);
		this.createLeadEmployees(nextProps.employees);
	}

	onChangeDate(date) {
		let valueObject = this.state.value;
		valueObject["startDate"] = date;
		this.setState({
			value: valueObject,
		});
	}

	onSubmit() {
		console.log(this.state);
		const project = {
			teamLead: this.state.value.teamLead,
			projectName: this.state.value.projectName,
			description: this.state.value.description,
			duration: this.state.value.duration,
			projectType: this.state.value.projectType,
			colorCode: this.state.value.colorCode,
			projectStatus: this.state.value.projectStatus,
			startDate: this.state.value.startDate,
		};

		console.log(project);
		this.props.postProject(project);
		this.props.history.push("/");
	}

	createLeadEmployees(employees) {
		return this.getLeads(employees);
	}

	getLeads(employees) {
		console.log(employees);
		let leads = employees.sort((data1, data2) => {
			return new Date(data1.createdAt) - new Date(data2.createdAt);
		});
		let leadsArray = leads.reduce(function (acc, cur) {
			let name = `${cur.firstname} ${cur.lastname}`;
			acc.push(name);
			return acc;
		}, []);
		console.log(leadsArray);
		return leadsArray;
	}

	render() {
		return (
			<div className="wrapper-box">
				<h3 className="wrapper-heading">Create New Exercise Log</h3>
				<Form
					state={this.state}
					addSubmitButton={true}
					onChange={(value) => this.setState({ value })}
					onSubmit={this.onSubmit}
					buttontext="Create Exercise">
					<Field
						type="select"
						id="teamLead"
						className="select"
						isRequired={true}
						label="Team Lead"
						optionsValue={this.state.employees}
						fieldName="teamLead"
					/>
					<Field
						type="text"
						id="projectName"
						className="something"
						isRequired={true}
						label="Project Name"
						fieldName="projectName"
					/>
					<Field
						type="text"
						id="description"
						className="something"
						isRequired={true}
						label="Description"
						fieldName="description"
					/>
					<Field
						type="text"
						id="duration"
						className="something"
						isRequired={true}
						label="Duration (in days)"
						fieldName="duration"
					/>
					<Field
						type="text"
						id="projectType"
						className="something"
						isRequired={true}
						label="Project Type"
						fieldName="projectType"
					/>
					<Field
						type="text"
						id="colorCode"
						className="something"
						isRequired={true}
						label="Color Code"
						fieldName="colorCode"
					/>
					<Field
						type="text"
						id="projectStatus"
						className="something"
						isRequired={true}
						label="Project Status"
						fieldName="projectStatus"
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
				</Form>
			</div>
		);
	}
}

CreateExercise.propTypes = {
	getEmployees: PropTypes.func.isRequired,
	employees: PropTypes.array.isRequired,
	postResponse: PropTypes.array,
};

const mapStateToProps = (state) => ({
	employees: state.employees.employees,
	postResponse: state.projects.postResponse,
});

export default withRouter(
	connect(mapStateToProps, { getEmployees, postProject })(CreateExercise)
);