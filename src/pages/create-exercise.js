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
		};
	}

	componentDidMount() {
		this.props.getEmployees();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.employees) {
			this.setState({
				projects: nextProps.employees,
			});
		}
		console.log(nextProps.employees);
	}

	onChangeDate(date) {
		this.setState({});
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
			startDate: this.state.value.date,
		};

		console.log(project);

		// axios
		// 	.post("http://localhost:5000/projects/add", project)
		// 	.then((res) => console.log(res.data));

		// window.location = "/";
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
	employees: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	employees: state.employees,
});

export default withRouter(
	connect(mapStateToProps, { getEmployees })(CreateExercise)
);