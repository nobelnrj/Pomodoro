import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
	constructor(props) {
		super(props);

		this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeProjectname = this.onChangeProjectname.bind(this);
		this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeProjectType = this.onChangeProjectType.bind(this);
    this.onChangeColorCode = this.onChangeColorCode.bind(this);
    this.onChangeProjectStatus = this.onChangeProjectStatus.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.state = {
			teamLead: "",
			projectName: "",
			description: "",
			duration: 0,
			projectType: "",
			colorCode: "",
			projectStatus: "",
			date: new Date(),
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/employees/")
			.then((response) => {
				if (response.data.length > 0) {
					console.log(response.data);
					this.setState({
						users: response.data.map((user) => user.username),
						teamLead: response.data[0].username,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	onChangeUsername(e) {
		this.setState({
			teamLead: e.target.value,
		});
	}

	onChangeProjectname(e) {
		this.setState({
			projectName: e.target.value,
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

	onChangeProjectType(e) {
		this.setState({
			projectType: e.target.value,
		});
	}

	onChangeColorCode(e) {
		this.setState({
			colorCode: e.target.value,
		});
	}

  onChangeProjectStatus(e) {
    this.setState({
			projectStatus: e.target.value,
		});
  }

	onChangeDate(date) {
		this.setState({
			date: date,
		});
	}

	onSubmit(e) {
		e.preventDefault();

		const project = {
			teamLead: this.state.teamLead,
			projectName: this.state.projectName,
			description: this.state.description,
			duration: this.state.duration,
			projectType: this.state.projectType,
			colorCode: this.state.colorCode,
			projectStatus: this.state.projectStatus,
			startDate: this.state.date,
		};

		console.log(project);

		axios
			.post("http://localhost:5000/projects/add", project)
			.then((res) => console.log(res.data));

		window.location = "/";
	}

	render() {
		return (
			<div>
				<h3>Create New Exercise Log</h3>
				<form onSubmit={this.onSubmit}>
					<div className="form-group">
						<label>Team Lead: </label>
						<select
							ref="userInput"
							required
							className="form-control"
							value={this.state.teamLead}
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
						<label>Project Name: </label>
						<input
							type="text"
							required
							className="form-control"
							value={this.state.projectName}
							onChange={this.onChangeProjectname}
						/>
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
						<label>Duration (in days): </label>
						<input
							type="text"
							className="form-control"
							value={this.state.duration}
							onChange={this.onChangeDuration}
						/>
					</div>
					<div className="form-group">
						<label>Project Type: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.projectType}
							onChange={this.onChangeProjectType}
						/>
					</div>
					<div className="form-group">
						<label>Color Code: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.colorCode}
							onChange={this.onChangeColorCode}
						/>
					</div>
					<div className="form-group">
						<label>Project Status: </label>
						<input
							type="text"
							className="form-control"
							value={this.state.projectStatus}
							onChange={this.onChangeProjectStatus}
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
							value="Create Exercise Log"
							className="btn btn-primary"
						/>
					</div>
				</form>
			</div>
		);
	}
}