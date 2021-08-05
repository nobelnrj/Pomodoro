/** @format */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	getProjects,
	getProjectAllTags,
	removeProject,
} from "../store/actions/projects/action";
import { withRouter } from "react-router-dom";
import ProjectTile from "../components/Projects/ProjectTile";
import style from "../assets/css/pages/projectList.module.css";
import FilterBox from "../components/Projects/filterBox";

class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.deleteExercise = this.deleteExercise.bind(this);
		this.exerciseList = this.exerciseList.bind(this);
		this.onSort = this.onSort.bind(this);
		this.startTagsFiltering = this.startTagsFiltering.bind(this);
		this.startSearchFiltering = this.startSearchFiltering.bind(this);
		this.resetToDefaultProjects = this.resetToDefaultProjects.bind(this);
		this.startFiltering = this.startFiltering.bind(this);

		this.state = {
			exercises: [],
			projects: [],
			tags: [],
			filteredProjects: [],
			filterTags: [],
			filters: { Search: "", Tags: [] },
		};
	}

	componentDidMount() {
		this.props.getProjects();
		this.props.getProjectAllTags();
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if (nextProps.projects) {
			this.setState({
				projects: nextProps.projects.projects,
				filteredProjects: nextProps.projects.projects,
				tags: nextProps.projects.tags,
			});
		}
		console.log(nextProps.projects);
	}

	deleteExercise(id) {
		this.props.removeProject(id);
	}

	exerciseList() {
		if (this.state.filteredProjects.length > 0) {
			return this.state.filteredProjects.map((project) => {
				return (
					<ProjectTile
						project={project}
						deleteExercise={this.deleteExercise}
						key={project._id}
					/>
				);
			});
		} else {
			return <p>No projects found :(</p>;
		}
	}

	startSearchFiltering(project, value) {
		console.log(project, value);
		if (project.projectName.toLowerCase().includes(value.toLowerCase())) {
			return true;
		}
		return false;
	}

	startSorting(project1, project2, value) {
		switch (value) {
			case "name_ascending":
				return project2.projectName - project1.projectName;
			case "name_descending":
				return project1.projectName - project2.projectName;
			case "date_ascending":
				return new Date(project1.startDate) - new Date(project2.startDate);
			case "date_descending":
				return new Date(project2.startDate) - new Date(project1.startDate);
			default:
				return null;
		}
	}

	onSort(e) {
		console.log(e.target.value);
		let filteredProjects = this.state.filteredProjects.sort(
			(project1, project2) =>
				this.startSorting(project1, project2, e.target.value)
		);
		console.log(filteredProjects);
		this.setState({
			filteredProjects,
		});
	}

	startTagsFiltering(project, filters) {
		console.log(filters);
		if (project.tags === undefined) {
			return false;
		}
		return filters.some((tag) => project.tags.includes(tag));
	}

	resetToDefaultProjects() {
		let projects = this.state.projects;
		this.setState({
			filteredProjects: projects,
		});
	}

	startFiltering(filters) {
		let filteredProjects = this.state.projects;
		for (let prop in filters) {
			if (filters[prop].length > 0) {
				filteredProjects = filteredProjects.filter((project) =>
					this[`start${prop}Filtering`](project, filters[prop])
				);
			}
		}
		console.log(filters, filteredProjects);
		this.setState({
			filteredProjects,
		});
	}

	render() {
		return (
			<div className="wrapper-box">
				<FilterBox
					resetToDefaultProjects={this.resetToDefaultProjects}
					startFiltering={this.startFiltering}
					onSort={this.onSort}
					tags={this.state.tags}
				/>
				<h3 className="wrapper-heading">Projects</h3>
				<div className={style.projectListContainer}>{this.exerciseList()}</div>
			</div>
		);
	}
}

ExercisesList.propTypes = {
	getProjects: PropTypes.func.isRequired,
	getProjectAllTags: PropTypes.func.isRequired,
	removeProject: PropTypes.func.isRequired,
	projects: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	projects: state.projects,
	tags: state.tags,
	errors: state.errors,
});

export default withRouter(
	connect(mapStateToProps, { getProjects, getProjectAllTags, removeProject })(
		ExercisesList
	)
);
