/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import projectTile from "../../assets/css/components/projectTile.module.css";
import ProgressBar from "./progressBar";

export default class ProjectTile extends Component {
	constructor(props) {
		super();
		this.state = {
			project: props.project,
			deleteExercise: props.deleteExercise,
			actionState: false,
		};
	}
	getBusinessDateCount(startDate, endDate) {
		var elapsed, daysBeforeFirstSunday, daysAfterLastSunday;
		var ifThen = function (a, b, c) {
			return a === b ? c : a;
		};

		elapsed = endDate - startDate;
		elapsed /= 86400000;

		daysBeforeFirstSunday = (7 - startDate.getDay()) % 7;
		daysAfterLastSunday = endDate.getDay();

		elapsed -= daysBeforeFirstSunday + daysAfterLastSunday;
		elapsed = (elapsed / 7) * 5;
		elapsed +=
			ifThen(daysBeforeFirstSunday - 1, -1, 0) +
			ifThen(daysAfterLastSunday, 6, 5);

		return Math.ceil(elapsed);
	}
	progressData(type) {
		let todaysDate = new Date();
		let startdate = new Date(this.state.project.startDate);
		var duration = this.state.project.duration;
		var daysElapsed = this.getBusinessDateCount(startdate, todaysDate);
		var percentage = 100 - ((duration - daysElapsed) / duration) * 100;
		percentage = percentage > 100 ? 100 : percentage;
		switch (type) {
			case "percentage":
				return Math.round(percentage);
			case "days":
				return duration - daysElapsed;
			default:
				return null;
		}
	}
	openActions() {}
	render() {
		const { project, deleteExercise } = this.state;
		const tileBackground = {
			backgroundColor: this.state.project.colorCode,
			opacity: 0.6,
		};
		const dayCountStyle = {
			color: this.state.project.colorCode,
		};
		const actionBackground = {
			backgroundColor: this.state.project.colorCode,
		};
		const actionButtonColor = {
			color: this.state.project.colorCode,
		};
		return (
			<div className={projectTile.container}>
				<div className={projectTile.overlay} style={tileBackground}></div>
				<div className={projectTile.header}>
					<div className={projectTile.startDate}>
						{project.startDate.substring(0, 10)}
					</div>
				</div>
				<div className={projectTile.content}>
					<p className={projectTile.name}>{project.projectName}</p>
					<p className={projectTile.type}>{project.projectType}</p>
					<p className={projectTile.lead}>Lead By: {project.teamLead}</p>
					<ProgressBar
						percentage={this.progressData("percentage")}
						progressColor={project.colorCode}
					/>
				</div>
				<div className={projectTile.footer}>
					<div className={projectTile.dayCount} style={dayCountStyle}>
						{this.progressData("days") > 0
							? this.progressData("days") > 6
								? this.progressData("days") > 27
									? `${Math.round(this.progressData("days") / 30)} months left`
									: `${Math.round(this.progressData("days") / 7)} weeks left`
								: `${this.progressData("days")} days left`
							: "Completed"}
					</div>
				</div>
				<button
					className={`${projectTile.actionTrigger} ${
						this.state.actionState ? projectTile.actionTriggerOpen : ""
					}`}
					onClick={(e) => {
						var currentState = this.state.actionState;
						currentState = currentState ? false : true;
						this.setState({
							actionState: currentState,
						});
					}}></button>
				<div
					className={`${projectTile.actionWrapper} ${
						this.state.actionState ? projectTile.actionWrapperOpen : ""
					}`}
					style={actionBackground}>
					<Link
						className={projectTile.actionButton}
						style={actionButtonColor}
						to={"/view/" + project._id}>
						view
					</Link>
					<Link
						className={projectTile.actionButton}
						style={actionButtonColor}
						to={"/edit/" + project._id}>
						edit
					</Link>
					<button
						className={projectTile.actionButton}
						style={actionButtonColor}
						onClick={() => {
							deleteExercise(project._id);
						}}>
						delete
					</button>
				</div>
			</div>
		);
	}
}
