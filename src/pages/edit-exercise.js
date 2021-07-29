import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { withRouter } from "react-router-dom";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getProjectById } from "../store/actions/projects/action";

class EditExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
		this.onChangeDescription = this.onChangeDescription.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			username: "",
			projectName: "",
			description: "",
			duration: 0,
			projectType: "",
			colorCode: "",
			projectStatus: "",
			startDate: new Date(),
			users: [],
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
      this.setState({
				username: nextProps.projectById.projects.teamLead,
				projectName: nextProps.projectById.projects.projectName,
				description: nextProps.projectById.projects.description,
				duration: nextProps.projectById.projects.duration,
				startDate: new Date(nextProps.projectById.projects.startDate),
			});
    }
	}

	onChangeUsername(e) {
		this.setState({
			username: e.target.value,
		});
	}

	onChangeDescription(e) {
		this.setState({
			description: e.target.value,
		});
	}

	onChangeDuration(e) {
		this.setState({
			duration: e.target.value,
		});
	}

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const exercise = {
			username: this.state.teamLead,
			description: this.state.description,
			duration: this.state.duration,
			date: this.state.startDate,
		};

		console.log(exercise);

		axios
			.post(
				"http://localhost:5000/exercises/update/" + this.props.match.params.id,
				exercise
			)
			.then((res) => console.log(res.data));

		// window.location = '/';
	}

	render() {
		return (
			<div>
				<h3>Edit {this.state.projectName} data</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Username: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.username}
							onChange={this.onChangeUsername}>
							{this.state.users.map(function (user) {
								return (
									<option key={user} value={user}>
										{user}
									</option>
								);
							})}
						</select>
					</div>
					<div className="form-group">
						<label>Description: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.description}
							onChange={this.onChangeDescription}
						/>
					</div>
					<div className="form-group">
						<label>Duration (in minutes): </label>
						<input
							type="text"
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group">
						<label>Date: </label>
						<div>
							<DatePicker
								selected={this.state.date}
								onChange={this.onChangeDate}
							/>
						</div>
					</div>

					<div className="form-group">
						<input
							type="submit"
							value="Edit Exercise Log"
							className="btn btn-primary"
						/>
					</div>
				</form>
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