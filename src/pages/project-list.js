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
import { ReactComponent as FilterIcon } from "../assets/svg/filter.svg";

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
			isAuthenticated: false,
			isFilterBoxOpen: window.innerWidth < 700 ? false : true,
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
				isAuthenticated: nextProps.auth.isAuthenticated,
			});
		}
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
						isAuthenticated={this.state.isAuthenticated}
						colorStrength={project.colorCode &&  this.wc_hex_is_light(project.colorCode.toLowerCase())}
					/>
				);
			});
		} else {
			return <p>No projects found :(</p>;
		}
	}

	startSearchFiltering(project, value) {
		if (project.projectName.toLowerCase().includes(value.toLowerCase())) {
			return true;
		}
		return false;
	}

	startSorting(project1, project2, value) {
		switch (value) {
			case "name_ascending":
				if (project1.projectName < project2.projectName) {
					return -1;
				} else {
					return 1;
				}
			case "name_descending":
				if (project2.projectName < project1.projectName) {
					return -1;
				} else {
					return 1;
				}
			case "date_ascending":
				return new Date(project1.startDate) - new Date(project2.startDate);
			case "date_descending":
				return new Date(project2.startDate) - new Date(project1.startDate);
			default:
				return null;
		}
	}

	onSort(e) {
		let filteredProjects = this.state.filteredProjects.sort(
			(project1, project2) =>
				this.startSorting(project1, project2, e.target.value)
		);
		this.setState({
			filteredProjects,
		});
	}

	startTagsFiltering(project, filters) {
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

	isEmpty(obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				return false;
			}
		}
		return JSON.stringify(obj) === JSON.stringify({});
	}

	startFiltering(filters) {
		let filteredProjects = this.state.projects;
		if (this.isEmpty(filters)) {
			this.resetToDefaultProjects();
			return;
		}
		for (let prop in filters) {
			if (filters[prop].length > 0) {
				filteredProjects = filteredProjects.filter((project) =>
					this[`start${prop}Filtering`](project, filters[prop])
				);
			}
		}
		this.setState({
			filteredProjects,
		});
	}

	wc_hex_is_light(color) {
		const hex = color.replace('#', '');
		const c_r = parseInt(hex.substr(0, 2), 16);
		const c_g = parseInt(hex.substr(2, 2), 16);
		const c_b = parseInt(hex.substr(4, 2), 16);
		const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
		return brightness > 155;
	}

	render() {
		const { isFilterBoxOpen } = this.state;
		return (
			<div className="wrapper-box">
				{window.innerWidth < 700 && <span className={style.filterIconWrapper} onClick={() => this.setState({isFilterBoxOpen: !isFilterBoxOpen})}><FilterIcon /></span>}
				{isFilterBoxOpen && <FilterBox
					resetToDefaultProjects={this.resetToDefaultProjects}
					startFiltering={this.startFiltering}
					onSort={this.onSort}
					tags={this.state.tags}
				/>}
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
	auth: state.auth,
});

export default withRouter(
	connect(mapStateToProps, { getProjects, getProjectAllTags, removeProject })(
		ExercisesList
	)
);
