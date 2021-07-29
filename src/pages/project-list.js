/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProjects, removeProject } from "../store/actions/projects/action";
import { withRouter } from "react-router-dom";
import ProjectTile from "../components/Projects/ProjectTile";
import style from "../assets/css/pages/projectList.module.css";

class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);

		this.state = { exercises: [], projects: [] };
	}

	componentDidMount() {
		this.props.getProjects();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.projects) {
			this.setState({
				projects: nextProps.projects.projects,
			});
		}
		console.log(nextProps.projects);
	}

	deleteExercise(id) {
		this.props.removeProject(id);
	}

	exerciseList() {
		return this.state.projects.map((project) => {
			return (
				<ProjectTile
					project={project}
					deleteExercise={this.deleteExercise}
					key={project._id}
				/>
			);
		});
	}

	render() {
		return (
			<div className={style.projectList}>
				<h3 className={style.projectListHeading}>Projects</h3>
				<div className={style.projectListContainer}>{this.exerciseList()}</div>
			</div>
		);
	}
}

ExercisesList.propTypes = {
	getProjects: PropTypes.func.isRequired,
	removeProject: PropTypes.func.isRequired,
	projects: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	errors: state.errors,
});

export default withRouter(
	connect(mapStateToProps, { getProjects, removeProject })(ExercisesList)
);
